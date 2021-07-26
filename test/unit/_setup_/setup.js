const path = require('path');
const { exec } = require('child_process');
const kill = require('kill-port');

const puppeteerSetup = require('./puppeteer/setup');

module.exports = async () => {
  await kill(4451, 'tcp');
  await kill(4452, 'tcp');
  await kill(4454, 'tcp');

  const schemaDir = path.resolve(__dirname, '../');
  const pageElementUiDir = path.resolve(__dirname, '../../pages/element-ui-2/dist');
  const pageAntDesignVue1Dir = path.resolve(__dirname, '../../pages/ant-design-vue-1/dist');
  exec(`http-server ${schemaDir} --port=4451 --cors`);
  exec(`http-server ${pageElementUiDir} --port=4452`);
  exec(`http-server ${pageAntDesignVue1Dir} --port=4454`);

  await puppeteerSetup();
}
