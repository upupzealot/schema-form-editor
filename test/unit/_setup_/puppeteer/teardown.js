// teardown.js
const fse = require('fs-extra');
const path = require('path');

const tempDir = path.join(__dirname, '.tmp');
module.exports = async function () {
  // close the browser instance
  if(global.__BROWSER_GLOBAL__) {
    await global.__BROWSER_GLOBAL__.close();
  }

  // clean-up the wsEndpoint file
  try {
    await fse.unlink(tempDir);
  } catch (err) {
    // Error: EPERM: operation not permitted, unlink
    // just give up
  }
};
