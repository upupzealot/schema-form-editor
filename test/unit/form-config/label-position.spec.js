import { boundOf, paddingOf } from '../util'

describe('标签位置', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=input-only`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  describe('默认右对齐', () => {
    let label1 = null;
    let labelPaddingRight = null;
    let labelText1 = null;
    let content1 = null;
    beforeAll(async () => {
      let labelPadding1 = null;
      if(uikit === 'element-ui') {
        label1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__label');
        labelPadding1 = await paddingOf(page, '#app [sfr-f="input-1"] .el-form-item__label');
        labelText1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__label span');
        content1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__content');
      }
      if(uikit === 'ant-design') {
        label1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-label');
        labelPadding1 = await paddingOf(page, '#app [sfr-f="input-1"] .ant-form-item-label');
        labelText1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-label label');
        content1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-control-wrapper');
      }
      labelPaddingRight = parseInt(labelPadding1.right);
    });

    test('标签和内容左右相靠', () => {
      expect(label1.right).toEqual(content1.left);
    });
    test('标签和内容顶部对齐', () => {
      expect(label1.top).toEqual(content1.top);
    });
    test('标签文字向右对齐', () => {
      expect(labelText1.right).toEqual(label1.right - labelPaddingRight);
    });
  });

  describe('设置为左对齐', () => {
    let label1 = null;
    let labelText1 = null;
    let content1 = null;
    beforeAll(async () => {
      await page.evaluate(()=>{
        window.$form.schema.formConf = {
          labelPosition: 'left'
        }
      });
      await delay(1000);

      if(uikit === 'element-ui') {
        label1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__label');
        labelText1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__label span');
        content1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__content');
      }
      if(uikit === 'ant-design') {
        label1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-label');
        labelText1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-label label');
        content1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-control-wrapper');
      }
    });

    test('标签和内容左右相靠', () => {
      expect(label1.right).toEqual(content1.left);
    });
    test('标签和内容顶部对齐', () => {
      expect(label1.top).toEqual(content1.top);
    });
    test('标签文字向右对齐', () => {
      expect(label1.left).toEqual(labelText1.left);
    });
  });

  describe('设置为顶部对齐', () => {
    let label1 = null;
    let labelText1 = null;
    let content1 = null;
    beforeAll(async () => {
      await page.evaluate(()=>{
        window.$form.schema.formConf = {
          labelPosition: 'top'
        }
      });
      await delay(1000);

      if(uikit === 'element-ui') {
        label1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__label');
        labelText1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__label span');
        content1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__content');
      }
      if(uikit === 'ant-design') {
        label1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-label');
        labelText1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-label label');
        content1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-control-wrapper');
      }
    });

    test('标签和内容上下相靠', () => {
      expect(label1.bottom).toEqual(content1.top);
    });
    test('标签和内容左对齐', () => {
      expect(label1.left).toEqual(content1.left);
    });
    test('标签和内容左对齐', () => {
      expect(label1.left).toEqual(labelText1.left);
    });
  });
})
