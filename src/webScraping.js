import { launch } from "puppeteer";
import { writeScrapingResult } from "./utils/files.js";
import { convertToNumber } from "./utils/general.js"
import _ from "lodash";

const scrapp = async () => {
  try {
    // Launch the browser (minimized)
    const browser = await launch();

    // Launch the browser (maximized) -- used for debuging
    // const browser = await launch({
    //     headless: false,
    //     defaultViewport: null,
    //     args: ["--start-maximized"],
    //   });

    const page = await browser.newPage();
    await page.goto("https://news.ycombinator.com/");

    const results = await page.$$eval(".athing", (elements) => {
      return elements.map((element) => {
        // Get the order
        const order = element.id;

        // Get the title
        const titleElement =
          element.querySelector(".titleline a:not(.sitebit.comhead)") || null;
        const title = titleElement ? titleElement.textContent : null;

        // Get the points
        const nextSibling = element.nextElementSibling;
        const scoreElement = nextSibling
          ? nextSibling.querySelector(".score") || null
          : null;
        const pointsText = scoreElement ? scoreElement.textContent : null;
        const points = pointsText
          ? pointsText.replace("points", "").trim()
          : null;

        // Get the comments number
        const commentElement = nextSibling
          ? nextSibling.querySelectorAll('.subline a[href^="item"]') || null
          : null;
        const commentsText = commentElement[1]
          ? commentElement[1].innerText
          : "0";
        // Perform a null check before accessing properties or methods of commentsText
        const comments = commentsText
          ? (commentsText.match(/\d+/) || ["0"])[0]
          : "0";

        return { order, title, points, comments };
      });
    });

    // Wait a litle bit to have some time to check for logs
    //await page.waitForTimeout(60000);

    await browser.close();

    return results;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const processScrapingResult = (result, fileName) => {
  const [moreThanFiveWords, lessThanOrEqualFiveWords] = _.partition(
    result,
    (item) => {
      const wordsInTitle = item.title.split(" ").length;
      return wordsInTitle > 5;
    },
  );

  const sortedMoreThanFiveWords = _.orderBy(
    moreThanFiveWords.map(convertToNumber),
    ["comments"],
    ["desc"],
  );

  const sortedLessThanOrEqualFiveWords = _.orderBy(
    lessThanOrEqualFiveWords.map(convertToNumber),
    ["points"],
    ["asc"],
  );

  console.log(
    "More than five words, ordered by comments:",
    sortedMoreThanFiveWords,
  );
  console.log(
    "Less than or equal to five words, ordered by points:",
    sortedLessThanOrEqualFiveWords,
  );

  writeScrapingResult(sortedMoreThanFiveWords, fileName.concat('sortedByComments')); 
  writeScrapingResult(sortedLessThanOrEqualFiveWords, fileName.concat('sortedByPoints'));

  return writeScrapingResult(result, fileName); 
};

export { scrapp, processScrapingResult };
