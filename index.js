import { writeSrappingResult } from "./src/utils/files.js";
import { scrapp } from "./src/webScrapping.js";
import inquirer from "inquirer";

const processScrappingResult = (result, fileName) => {
    return writeSrappingResult(result, fileName)
}

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
                .then((result) => processScrappingResult(result, fileName))
                .catch((error) => {console.error('Error:', error);
            });
        });

startScrapping()