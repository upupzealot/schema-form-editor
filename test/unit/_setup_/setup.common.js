import { mount } from '@vue/test-utils'

global.wrap = (option) => {
  return mount(SchemaFormRender, option);
}
