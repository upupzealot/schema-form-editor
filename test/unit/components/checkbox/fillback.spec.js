import FillbackSchema from './fillback.schema.json'

describe('单选框：回填', () => {
  const wrapper = wrap({
    propsData: {
      schema: FillbackSchema,
      data: {
        'checkbox-1': ['option1'],
        'checkbox-2': ['option1'],
        'checkbox-3': ['option1'],
      }
    }
  });

  test('默认', () => {
    const $checks = wrapper.getField('checkbox-1').findAll(`
      .el-checkbox.is-checked,
      .ant-checkbox-wrapper.ant-checkbox-wrapper-checked`);
    expect($checks.length).toEqual(1);
    expect(($checks.wrappers || $checks)[0].text()).toEqual('选项一');
  });

  let antSkip = test;
  if(uikit === 'ant-design') {
    antSkip = test.skip;
  }
  antSkip('带有边框', () => {
    const $checks = wrapper.getField('checkbox-2').findAll(`
      .el-checkbox.is-checked`);
      expect($checks.length).toEqual(1);
      expect(($checks.wrappers || $checks)[0].text()).toEqual('选项一');
  });

  antSkip('按钮组', () => {
    const $checks = wrapper.getField('checkbox-3').findAll(`
      .el-checkbox-button.is-checked`);
      expect($checks.length).toEqual(1);
      expect(($checks.wrappers || $checks)[0].text()).toEqual('选项一');
  });
})
