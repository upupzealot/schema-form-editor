import FillbackSchema from './fillback.schema.json'

describe('下拉选项：回填', () => {
  const wrapper = wrap({
    propsData: {
      schema: FillbackSchema,
      data: {
        'select-1': 'option1',
        'select-2': 111,
        'select-3': true,
        "select-4": [
          "option1",
          "option2"
        ],
      }
    }
  });

  test('值：字符串', () => {
    if(uikit === 'element-ui') {
      const $select = wrapper.getField('select-1').find('.el-select input');
      expect($select.element.value).toEqual('选项一');
    }
    if(uikit === 'ant-design') {
      const $select = wrapper.getField('select-1').find('.ant-select');
      expect($select.text()).toEqual('选项一');
    }
  });

  test('值：数字', () => {
    if(uikit === 'element-ui') {
      const $select = wrapper.getField('select-2').find('.el-select input');
      expect($select.element.value).toEqual('选项一');
    }
    if(uikit === 'ant-design') {
      const $select = wrapper.getField('select-2').find('.ant-select');
      expect($select.text()).toEqual('选项一');
    }
  });

  test('值：布尔值', () => {
    if(uikit === 'element-ui') {
      const $select = wrapper.getField('select-3').find('.el-select input');
      expect($select.element.value).toEqual('选项一');
    }
    if(uikit === 'ant-design') {
      const $select = wrapper.getField('select-3').find('.ant-select');
      expect($select.text()).toEqual('选项一');
    }
  });

  test('多选', () => {
    const $select = wrapper.getField('select-4').find('.el-select, .ant-select');
    expect($select.text().replace(/\s/g, '')).toEqual('选项一选项二');
  });
})
