import InputOnlySchema from '../input-only.schema.json'

describe('key 和标签', () => {
  const formData = {};
  const wrapper = wrap({
    schema: InputOnlySchema,
    data: formData,
  });

  test('key', async () => {
    const $input1 = wrapper.getField('input-1').find('input');
    await $input1.setValue('aaaaa');
    expect(formData).toHaveProperty('input-1', 'aaaaa');
  });

  test('标签', async () => {
    const $label = wrapper.getField('input-1').find('label');
    expect($label.text()).toEqual('文本框');
  });
})
