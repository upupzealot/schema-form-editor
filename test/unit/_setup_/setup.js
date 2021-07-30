const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const kill = require('kill-port');

const puppeteerSetup = require('./puppeteer/setup');

module.exports = async () => {
  await kill(4451, 'tcp');
  await kill(4452, 'tcp');
  await kill(4454, 'tcp');

  const schemaDir = path.resolve(__dirname, '../');
  exec(`http-server ${schemaDir} --port=4451 --cors`);

  const { version } = fs.readJsonSync('./node_modules/vue/package.json');
  const isVue2 = version.startsWith('2.');

  let pageElementUiDir = null;
  if(isVue2) {
    pageElementUiDir = path.resolve(__dirname, '../../pages/element-ui-2/dist');
  } else {
    pageElementUiDir = path.resolve(__dirname, '../../pages/element-plus-3/dist');
  }
  exec(`http-server ${pageElementUiDir} --port=4452`);

  let pageAntDesignVue1Dir = null;
  if(isVue2) {
    pageAntDesignVue1Dir = path.resolve(__dirname, '../../pages/ant-design-vue-1/dist');
  } else {
    pageAntDesignVue1Dir = path.resolve(__dirname, '../../pages/ant-design-vue-2/dist');
  }
  exec(`http-server ${pageAntDesignVue1Dir} --port=4454`);

  await puppeteerSetup();
}
