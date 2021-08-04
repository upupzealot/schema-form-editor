import MaxMinSchema from './max-min.schema.json'

describe(' 数字框：最大值/最小值', () => {
  const wrapper = wrap({
    schema: MaxMinSchema,
  });

  test('最大值', async () => {
    const $input1 = wrapper.getField('input-number-1').find('input');
    expect($input1.exists()).toBeTruthy();

    $input1.setValue('11');
    await $input1.trigger('blur'); // 数字框 blur 之后触发赋值
    expect($input1.element.value).toEqual('10');
  });

  test('最小值', async () => {
    const $input2 = wrapper.getField('input-number-2').find('input');
    expect($input2.exists()).toBeTruthy();

    $input2.setValue('1');
    await $input2.trigger('blur'); // 数字框 blur 之后触发赋值
    expect($input2.element.value).toEqual('2');
  });
})
