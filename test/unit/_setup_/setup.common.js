import { mount } from '@vue/test-utils'
import _ from 'lodash';

global._ = _;
global.wrap = (option) => {
  return mount(SchemaFormRender, option);
}
