import { scrapp } from "./src/webScrapping.js";
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
            let keyWord = answers.fileName;
            scrapp(keyWord).catch((error) => {
                console.error('Error:', error);
            });
        });

startScrapping()