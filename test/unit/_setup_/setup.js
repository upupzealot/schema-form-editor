const path = require('path');
const { exec } = require('child_process');
const kill = require('kill-port');

const puppeteerSetup = require('./puppeteer/setup');

module.exports = async () => {
  await kill(4451, 'tcp');
  await kill(4452, 'tcp');

  const schemaDir = path.resolve(__dirname, '../');
  const pageDir = path.resolve(__dirname, '../../pages/element-ui-2/dist');
  exec(`http-server ${schemaDir} --port=4451 --cors`);
  exec(`http-server ${pageDir} --port=4452`);

  await puppeteerSetup();
}
