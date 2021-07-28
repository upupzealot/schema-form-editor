import PrependAppendSchema from './prepend-append.schema.json'

describe('文本框：前后复合', () => {
  const wrapper = wrap({
    schema: PrependAppendSchema,
  });

  describe('单行文本', () => {
    test('前复合', () => {
      const $input1 = wrapper.getField('input-1').find('input');
      const prevEle = $input1.element.previousElementSibling;
      expect(prevEle).toBeTruthy();
      expect(prevEle.textContent.trim()).toEqual('aaa');
    });
  
    test('后复合', () => {
      const $input2 = wrapper.getField('input-2').find('input');
      const nextEle = $input2.element.nextElementSibling;
      expect(nextEle).toBeTruthy();
      expect(nextEle.textContent.trim()).toEqual('bbb');
    });
  
    test('前后复合', () => {
      const $input3 = wrapper.getField('input-3').find('input');
      const prevEle = $input3.element.previousElementSibling;
      const nextEle = $input3.element.nextElementSibling;
      expect(prevEle).toBeTruthy();
      expect(nextEle).toBeTruthy();
      
      expect(prevEle.textContent.trim()).toEqual('aaa');
      expect(nextEle.textContent.trim()).toEqual('bbb');
    });
  });

  describe('密码框', () => {
    function inputWrapper(field) {
      let $input = null;
      if(uikit === 'element-ui') {
        $input = wrapper.getField(field).find('input');
      }
      if(uikit === 'ant-design') {
        $input = wrapper.getField(field).find('.ant-input-affix-wrapper');
      }
      return $input;
    }

    test('前复合', () => {
      const $input4 = inputWrapper('input-4');
      const prevEle = $input4.element.parentNode.firstElementChild;
      expect(prevEle).toBeTruthy();
      expect(prevEle.textContent.trim()).toEqual('aaa');
    });
  
    test('后复合', () => {
      const $input5 = inputWrapper('input-5');
      const nextEle = $input5.element.parentNode.lastElementChild;
      expect(nextEle).toBeTruthy();
      expect(nextEle.textContent.trim()).toEqual('bbb');
    });
  
    test('前后复合', () => {
      const $input6 = inputWrapper('input-6');
      const prevEle = $input6.element.parentNode.firstElementChild;
      const nextEle = $input6.element.parentNode.lastElementChild;
      expect(prevEle).toBeTruthy();
      expect(nextEle).toBeTruthy();
      expect(prevEle.textContent.trim()).toEqual('aaa');
      expect(nextEle.textContent.trim()).toEqual('bbb');
    });
  });
})
