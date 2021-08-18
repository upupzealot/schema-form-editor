import FillbackSchema from './fillback.schema.json'

describe('单选框：回填', () => {
  const wrapper = wrap({
    propsData: {
      schema: FillbackSchema,
      data: {
        'radio-1': 'option1',
        'radio-2': 'option1',
        'radio-3': 'option1',
        'radio-4': 'option1',
      }
    }
  });

  test('默认', () => {
    const $select = wrapper.getField('radio-1').find(`
      .el-radio.is-checked,
      .ant-radio-wrapper.ant-radio-wrapper-checked`);
    expect($select.text()).toEqual('选项一');
  });

  let antSkip = test;
  if(uikit === 'ant-design') {
    antSkip = test.skip;
  }
  antSkip('带有边框', () => {
    const $select = wrapper.getField('radio-2').find(`
      .el-radio.is-checked,
      .ant-radio-wrapper.ant-radio-wrapper-checked`);
    expect($select.text()).toEqual('选项一');
  });

  test('按钮组', () => {
    const $select = wrapper.getField('radio-3').find(`
      .el-radio-button.is-active,
      .ant-radio-button-wrapper.ant-radio-button-wrapper-checked`);
    expect($select.text()).toEqual('选项一');
  });

  let eleSkip = test;
  if(uikit === 'element-ui') {
    eleSkip = test.skip;
  }
  eleSkip('边框按钮组', () => {
    const $select = wrapper.getField('radio-4').find(`
      .el-radio-button.is-active,
      .ant-radio-button-wrapper.ant-radio-button-wrapper-checked`);
    expect($select.text()).toEqual('选项一');
  });
})
