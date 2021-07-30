import ClearSchema from './clearable.schema.json'

describe('文本框：可清空', () => {
  let formData = {
    'input-1': 'aaa',
    'input-2': 'aaa'
  };
  const wrapper = wrap({
    schema: ClearSchema,
    data: formData,
  });

  test('单行文本', async () => {
    const $input1 = wrapper.getField('input-1');
    await $input1.find('input').trigger('focus'); // element 需要有焦点后才会出现清空按钮
    
    let $clearBtn = null;
    if(uikit === 'element-ui') {
      $clearBtn = $input1.find('.el-input__icon.el-input__clear');
    }
    if(uikit === 'ant-design') {
      $clearBtn = $input1.find('.anticon.anticon-close-circle');
    }
    expect($clearBtn.exists()).toBeTruthy();

    await $clearBtn.trigger('click');
    expect(formData['input-1']).not.toBeTruthy();
  });

  test('密码框', async () => {
    const $input2 = wrapper.getField('input-2');
    await $input2.find('input').trigger('focus'); // element 需要有焦点后才会出现清空按钮
    
    let $clearBtn = null;
    if(uikit === 'element-ui') {
      $clearBtn = $input2.find('.el-input__icon.el-input__clear');
    }
    if(uikit === 'ant-design') {
      $clearBtn = $input2.find('.anticon.anticon-close-circle');
    }
    expect($clearBtn.exists()).toBeTruthy();

    await $clearBtn.trigger('click');
    expect(formData['input-2']).not.toBeTruthy();
  });
})
