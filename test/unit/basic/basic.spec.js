import TestSchema from '../../test.schema.json'

describe('基本渲染', () => {
  const wrapper = wrap({
    schema: TestSchema,
  });

  test('全家桶渲染', () => {
    expect(wrapper.vm).toBeTruthy();
  });
})
