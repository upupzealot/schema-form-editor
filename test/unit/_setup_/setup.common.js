import _ from 'lodash';
import delay from 'delay';
import { mount, Wrapper } from '@vue/test-utils'
import puppeteer from 'puppeteer'

import launchConf from './puppeteer/launch.config';

Wrapper.prototype.getField = function getField(name) {
  return this.find(`[sfr-f="${name}"]`);
}

global._ = _;
global.delay = delay;
global.wrap = (option) => {
  let opt = option;
  if(!option.propsData) {
    opt = {
      propsData: option,
    };
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
