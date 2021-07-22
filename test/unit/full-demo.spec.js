import TestSchema from '../test.schema.json'

describe(`schema-form-render: ${uikit}`, () => {
  const wrapper = wrap({
    propsData: {
      schema: TestSchema,
      data: {}
    }
  });

  test('mounted', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test('check data format', () => {
    const { data } = wrapper.vm;
    expect(data['checkbox-6f0c7f9']).toBeInstanceOf(Array);
    expect(data['subform-62afc22']).toBeInstanceOf(Object);
    expect(data['item-list-dbbc4bb']).toBeInstanceOf(Array);
  });
})
