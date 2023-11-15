import { writeSrappingResult } from "./src/utils/files.js";
import { scrapp } from "./src/webScrapping.js";
import inquirer from "inquirer";
import _ from 'lodash';

const convertToNumber = item => ({
  ...item,
  points: parseInt(item.points, 10),
  comments: parseInt(item.comments, 10),
});

const processScrappingResult = (result, fileName) => {

    const [moreThanFiveWords, lessThanOrEqualFiveWords] = _.partition(result, item => {
        const wordsInTitle = item.title.split(' ').length;
        return wordsInTitle > 5;
      });
      
      const sortedMoreThanFiveWords = _.orderBy(
        moreThanFiveWords.map(convertToNumber),
        ['comments'],
        ['desc']
      );
      
      const sortedLessThanOrEqualFiveWords = _.orderBy(
        lessThanOrEqualFiveWords.map(convertToNumber),
        ['points'],
        ['asc']
      );
      
      console.log('More than five words, ordered by comments:', sortedMoreThanFiveWords);
      console.log('Less than or equal to five words, ordered by points:', sortedLessThanOrEqualFiveWords);

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