import StatusSchema from './status.schema.json'

describe('字段属性-状态控制', () => {
  const formData = {};
  const wrapper = wrap({
    schema: StatusSchema,
    data: formData,
  });

  test('是否激活', async () => {
    const $input1 = wrapper.getField('input-1');
    const $input2 = wrapper.getField('input-2');
    expect($input1.exists()).toBeTruthy();
    expect($input2.exists()).not.toBeTruthy();
  });

  test('是否显示', async () => {
    const $input1 = wrapper.getField('input-1');
    const $input3 = wrapper.getField('input-3');
    expect($input1.isVisible()).toBeTruthy();
    expect($input3.isVisible()).not.toBeTruthy();
  });

  test.todo('是否只读');
  // test('是否只读', async () => {
  //   const $input1 = wrapper.getField('input-1').find('input');
  //   const $input4 = wrapper.getField('input-4').find('input');
  //   expect($input1.exists()).toBeTruthy();
  //   expect($input4.exists()).not.toBeTruthy();
  // });

  test('是否禁用', async () => {
    const $input1 = wrapper.getField('input-1').find('input');
    const $input5 = wrapper.getField('input-5').find('input');
    await $input1.setValue('aaaaa');
    await $input5.setValue('aaaaa');
    expect(formData['input-1']).toEqual('aaaaa');
    expect(formData['input-5']).not.toBeTruthy();
  });
})
