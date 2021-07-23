const kill = require('kill-port');

const puppeteerTeardown = require('./puppeteer/teardown');

module.exports = async () => {
  await kill(4451, 'tcp');
  await kill(4452, 'tcp');

  await puppeteerTeardown();
}
