import { scrapp, processScrapingResult } from "./src/webScraping.js";
import inquirer from "inquirer";

const startScrapping = () =>
  inquirer
    .prompt([
      {
        name: "fileName",
        message: "File name to store the scrapping result? ",
      },
    ])
    .then((answers) => {
      const fileName = answers.fileName;
      scrapp()
        .then((result) => processScrapingResult(result, fileName))
        .catch((error) => {
          console.error("Error:", error);
        });
    });

startScrapping();
