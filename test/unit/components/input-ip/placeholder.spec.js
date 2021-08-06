import PlaceholderSchema from './placeholder.schema.json'

describe('IP 框：占位符', () => {
  const wrapper = wrap({
    propsData: {
      schema: PlaceholderSchema,
    }
  });

  test('IP格式', () => {
    const $inputs = wrapper.getField('input-ip-1').findAll('input');

    const inputsEles = [];
    for(let i = 0; i < $inputs.length; i++) {
      inputsEles.push(isVue2 ? $inputs.at(i) : $inputs[i]);
    }
    expect(inputsEles[0].element.placeholder).toEqual('192');
    expect(inputsEles[1].element.placeholder).toEqual('168');
    expect(inputsEles[2].element.placeholder).toEqual('0');
    expect(inputsEles[3].element.placeholder).toEqual('1');
  });

  test('自定义分段格式', () => {
    const $inputs = wrapper.getField('input-ip-2').findAll('input');

    const inputsEles = [];
    for(let i = 0; i < $inputs.length; i++) {
      inputsEles.push(isVue2 ? $inputs.at(i) : $inputs[i]);
    }
    expect(inputsEles[0].element.placeholder).toEqual('0~255');
    expect(inputsEles[1].element.placeholder).toEqual('0~255');
    expect(inputsEles[2].element.placeholder).toEqual('0~255');
    expect(inputsEles[3].element.placeholder).toEqual('0~255');
  });
})
