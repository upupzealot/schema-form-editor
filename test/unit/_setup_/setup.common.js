import _ from 'lodash';
import { mount, Wrapper } from '@vue/test-utils'

Wrapper.prototype.getField = function getField(name) {
  return this.find(`[sfr-f="${name}"]`);
}

global._ = _;
global.wrap = (option) => {
  let opt = option;
  if(!option.propsData) {
    opt = {
      propsData: option,
    };
  }
  return mount(SchemaFormRender, opt);
}
