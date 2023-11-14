import assert from 'assert';
import { scrapp } from '../src/webScrapping.js';
import fs from 'fs/promises';

describe('scrapp function', function () {

  it('should return an array of results', async function () {
    // Set timeout to 5000ms (5 seconds) for this test, if not we got a Mocha timeout error
    this.timeout(8000); 

    const keyWord = 'fileTestEx1';
    const results = await scrapp(keyWord);
    assert(Array.isArray(results));
  });

  it('should have valid result properties', async function () {
    // Set timeout to 5000ms (5 seconds) for this test, if not we got a Mocha timeout error
    this.timeout(8000); 

    const keyWord = 'fileTestEx2';
    const results = await scrapp(keyWord);

    if (results.length > 0) {
      const result = results[0];
      assert(result.hasOwnProperty('order'));
      assert(result.hasOwnProperty('title'));
      assert(result.hasOwnProperty('points'));
      assert(result.hasOwnProperty('comments'));
    }
  });

  it('should write results to a file', async function () {
    this.timeout(5000);

    const keyWord = 'fileTestEx3';
    const results = await scrapp(keyWord);

    // Check if the file is created in the 'output' folder
    const fileName = `${keyWord.replace(" ", "").toLowerCase()}.json`;
    const filePath = `output/${fileName}`;
    
    // Use fs.access to check if the file exists
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    
    assert.strictEqual(fileExists, true, 'File should be created in the "output" folder');
  });

  it('should write correct content to a file', async function () {
    this.timeout(5000);
    
    const keyWord = 'fileTestEx4';
    const results = await scrapp(keyWord);

    // Check if the file is created in the 'output' folder
    const fileName = `${keyWord.replace(" ", "").toLowerCase()}.json`;
    const filePath = `output/${fileName}`;

    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    assert.strictEqual(fileExists, true, 'File should be created');

    // Check if the file has the expected content
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const parsedContent = JSON.parse(fileContent);
    assert.deepStrictEqual(parsedContent, results, 'File content should match the scraping results');
  });
});



