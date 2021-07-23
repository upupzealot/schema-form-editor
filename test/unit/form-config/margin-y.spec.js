import MarginYSchema from './margin-y.schema.json'

describe(`表单属性-行间距`, () => {
  function checkMarginBottom(ele, value) {
    expect(ele.style).toHaveProperty('margin-bottom', `${value}px`);
  }

  test('默认距离 15px', () => {
    const $form = wrap({
      schema: MarginYSchema
    });
    const $input1 = $form.getField('input-1');
    if(uikit === 'element-ui') {
      checkMarginBottom($input1.element, 15);
    }
    if(uikit === 'ant-design') {
      checkMarginBottom($input1.element.parentElement, 15);
    }
  });

  test('设置为 20px', () => {
    const $form = wrap({
      schema: _.merge({}, MarginYSchema, {
        formConf: {
          marginY: 20
        }
      }),
    });
    const $input1 = $form.getField('input-1');
    if(uikit === 'element-ui') {
      checkMarginBottom($input1.element, 20);
    }
    if(uikit === 'ant-design') {
      checkMarginBottom($input1.element.parentElement, 20);
    }
  });
})
