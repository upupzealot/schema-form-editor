import PlaceholderSchema from './placeholder.schema.json'

describe('文本框：占位符', () => {
  const wrapper = wrap({
    schema: PlaceholderSchema,
  });

  test('单行文本', () => {
    const $input1 = wrapper.getField('input-1').find('input');
    expect($input1.element.placeholder).toEqual('这是 input-1 的占位符');
  });

  test('密码框', () => {
    const $input2 = wrapper.getField('input-2').find('input');
    expect($input2.element.placeholder).toEqual('这是 input-2 的占位符');
  });

  test('多行文本', () => {
    const $input3 = wrapper.getField('input-3').find('textarea');
    expect($input3.element.placeholder).toEqual('这是 input-3 的占位符');
  });
})
