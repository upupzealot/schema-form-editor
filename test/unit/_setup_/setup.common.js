import _ from 'lodash';
import delay from 'delay';
import { mount, Wrapper } from '@vue/test-utils'

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
