import { launch } from "puppeteer";
import { writeScrapingResult, writeScrapingResultCurried } from "./utils/files.js";
import { filterByCommentsDesc, filterByPointsAsc, partitionByFiveWords } from "./utils/filters.js";
import _ from 'lodash';

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
          : "0"; // Default to "0" if pointsText is falsy

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

    // Wait a little bit to have some time to check for logs
    //await page.waitForTimeout(60000);

    await browser.close();

    return results;
  } catch (error) {
    console.error("An error occurred:", error);
    return []; // Return an empty array in case of an error
  }
};

// Filter and write to file the scraping web result
const processScrapingResult = (result, fileName) => {
  const [moreThanFiveWords, lessThanOrEqualFiveWords] = partitionByFiveWords(result);

  // Filter scraping result by comments (descending order)
  _.flow(
    filterByCommentsDesc,
    writeScrapingResultCurried(fileName.concat('_more_than_5_words_sortedByComments_desc'))
  )(moreThanFiveWords);

  // Filter scraping result by points (ascending order)
  _.flow(
    filterByPointsAsc,
    writeScrapingResultCurried(fileName.concat('_less_or_equal_than_5_words_sortedByPoints_asc'))
  )(lessThanOrEqualFiveWords);

  return writeScrapingResult(result, fileName);
};

export { scrapp, processScrapingResult };
