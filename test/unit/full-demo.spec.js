import { mount } from '@vue/test-utils'
import SchemaFormRender from '../../src/ui-kit/element-ui'

import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI);

import TestSchema from '../test.schema.json'

describe('SchemaFormRender', () => {
  const wrapper = mount(SchemaFormRender, {
    propsData: {
      schema: TestSchema,
      data: {}
    }
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test('check data format', () => {
    const { data } = wrapper.vm;
    expect(data['checkbox-6f0c7f9']).toBeInstanceOf(Array);
    expect(data['subform-62afc22']).toBeInstanceOf(Object);
    expect(data['item-list-dbbc4bb']).toBeInstanceOf(Array);
  });
})
