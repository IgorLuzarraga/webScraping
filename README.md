# webScraping

## How to Use the App:

1. Clone the project.
2. Navigate to the directory where you cloned the app.
3. Run `npm install`.
4. Execute `npm run start`.
5. You will see a prompt asking, 'File name to store the scraping result?'
6. Enter the name of the file (filename) where the scraping results will be saved.
7. Check the 'output' folder in the project for the created files with the scraping results. These files follow the naming convention:

   - `filename.json`: the complete result for web scraping.
   - `filename_more_than_5_words_sortedbycomments_desc.json`: the result for web scraping with more than five words in the title ordered by the number of comments (descending order).
   - `filename_less_or_equal_than_5_words_sortedbypoints_asc.json`: the result for web scraping with less or equal to five words in the title ordered by points (ascending order).

   Note: You can find examples of these files in the project's 'output' folder.

8. To run tests, execute `npm test`. Result files from these tests will be stored in the 'output' folder.

## The Project:

Web crawler using scraping techniques to extract the first 30 entries from [Hacker News](https://news.ycombinator.com/). It returns the title, order number, number of comments, and points for each entry. Filtering operations include:

1. Filter all previous entries with more than five words in the title, ordered by the number of comments first.
2. Filter all previous entries with less than or equal to five words in the title, ordered by points.

## Technologies Used:

- **JavaScript:** Empowering interactive and dynamic web development, JavaScript is a versatile programming language.
- **Lodash:** A powerful JavaScript utility library, widely embraced in functional programming, simplifying and optimizing common tasks.
- **ESLint:** Ensuring code quality and consistency, ESLint is a pluggable linting utility for JavaScript.

- **Prettier:** Streamlining code formatting, Prettier is an opinionated code formatter that ensures consistent styling.

- **Mocha:** Simplifying JavaScript testing, Mocha is a flexible testing framework that runs on Node.js and in the browser.

- **Chai:** Enhancing assertion libraries, Chai is a BDD/TDD assertion library for Node.js and browsers.

- **Inquirer:** Facilitating interactive command-line interfaces, Inquirer is a powerful Node.js library for collecting user input.

- **Puppeteer:** Automating browser tasks, Puppeteer is a Node library providing a high-level API to control headless or full browsers.
