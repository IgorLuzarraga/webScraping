import fs from "fs";

// Write the scrapping results in a file
const writeSrappingResult = (results, keyWord) => {
    const isNotEmpty = (obj) => Object.keys(obj).length !== 0;
    const itemsClean = results.filter(isNotEmpty);

    const dataString = JSON.stringify(itemsClean);

    // Folder to save the file
    const outputPath = 'output'; 

    // Check if the 'output' folder exists, if not, create it
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }

    fs.writeFile(
        `${outputPath}/${keyWord.replace(" ", "").toLowerCase()}.json`,
        dataString,
        (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File written successfully');
            }
        }
    );
};

export { writeSrappingResult };