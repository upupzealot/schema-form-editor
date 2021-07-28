import { boundOf } from '../util'

describe('标签宽度', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=input-only`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('默认宽度 80px', async () => {
    let label1 = null;
    if(uikit === 'element-ui') {
      label1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__label');
    }
    if(uikit === 'ant-design') {
      label1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-label');
    }
    expect(label1.width).toEqual(80);
  });

  test('设置为 100px', async () => {
    await page.evaluate(()=>{
      window.$form.schema.formConf = {
        labelWidth: '100px'
      }
    });
    await delay(1000);

    let label1 = null;
    if(uikit === 'element-ui') {
      label1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__label');
    }
    if(uikit === 'ant-design') {
      label1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-label');
    }
    expect(label1.width).toEqual(100);
  });

  test('设置为 20%', async () => {
    await page.evaluate(()=>{
      window.$form.schema.formConf = {
        labelWidth: '20%'
      }
    });
    await delay(1000);

    let input1 = await boundOf(page, '#app [sfr-f="input-1"]');
    let label1 = null;
    if(uikit === 'element-ui') {
      label1 = await boundOf(page, '#app [sfr-f="input-1"] .el-form-item__label');
    }
    if(uikit === 'ant-design') {
      label1 = await boundOf(page, '#app [sfr-f="input-1"] .ant-form-item-label');
    }
    expect(label1.width).toEqual(input1.width * 0.2);
  });
})
