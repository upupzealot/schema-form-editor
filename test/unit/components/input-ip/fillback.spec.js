import FillbackSchema from './fillback.schema.json'

describe('IP 框：回填', () => {
  const wrapper = wrap({
    propsData: {
      schema: FillbackSchema,
      data: {
        'input-ip-1': '192.168.0.1',
      }
    }
  });

  test('数据回填', () => {
    const $inputs = wrapper.getField('input-ip-1').findAll('input');

    const inputsEles = [];
    for(let i = 0; i < $inputs.length; i++) {
      inputsEles.push(isVue2 ? $inputs.at(i) : $inputs[i]);
    }
    expect(inputsEles[0].element.value).toEqual('192');
    expect(inputsEles[1].element.value).toEqual('168');
    expect(inputsEles[2].element.value).toEqual('0');
    expect(inputsEles[3].element.value).toEqual('1');
  });
})
