// setup.js
const fse = require('fs-extra');
const path = require('path');
const puppeteer = require('puppeteer');

const tempDir = path.join(__dirname, '.tmp');

module.exports = async function () {
  const browser = await puppeteer.launch({
    headless: false,
  });
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__BROWSER_GLOBAL__ = browser;

  // use the file system to expose the wsEndpoint for TestEnvironments
  await fse.outputFile(path.join(tempDir, 'wsEndpoint'), browser.wsEndpoint());
};
