import ModeSchema from './mode.schema.json'

describe('文本框：组件模式', () => {
  const wrapper = wrap({
    schema: ModeSchema,
  });

  test('单行文本', () => {
    const $input1 = wrapper.getField('input-1').find('input');
    expect($input1.element).toBeTruthy();
  });

  test('密码框', () => {
    const $input2 = wrapper.getField('input-2').find('input');
    expect($input2.element.type).toEqual('password');
  });

  test('多行文本', () => {
    const $input3 = wrapper.getField('input-3').find('textarea');
    expect($input3.element).toBeTruthy();
  });
})
