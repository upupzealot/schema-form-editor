import _ from 'lodash';
import delay from 'delay';

import puppeteer from 'puppeteer'
import launchConf from './puppeteer/launch.config';

const { mount, Wrapper, VueWrapper } = require('vue-test-util-alias');
if (isVue2) {
  Wrapper.prototype.getField = function getField(name) {
    return this.find(`[sfr-f="${name}"]`);
  }
} else {
  VueWrapper.prototype.getField = function getField(name) {
    return this.find(`[sfr-f="${name}"]`);
  }
}

global.console = {
  log: console.log,
  error: console.error,
  warn: jest.fn(),
  info: console.info,
  debug: console.debug,
};

global._ = _;
global.delay = delay;
global.wrap = (option) => {
  let opt = option;
  if(!option.propsData) {
    opt = {};
    opt[isVue2 ? 'propsData' : 'props'] = option;
  }
  if(global.UIKIT) {
    opt.global = _.merge({}, opt.global, {
      plugins: [global.UIKIT]
    });
  }
  return mount(SchemaFormRender, opt);
}
global.brandnewPage = async (url) => {
  const browser = await puppeteer.launch(launchConf);

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle0',
  });
  await delay(1000);

  return page;
}
