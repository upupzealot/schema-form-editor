import _ from 'lodash';
import { mount, Wrapper } from '@vue/test-utils'

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
