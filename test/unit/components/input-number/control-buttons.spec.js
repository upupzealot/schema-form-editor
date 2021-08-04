import { boundOf } from '../../util'

describe('文本框：控制按钮', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/input-number/control-buttons`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('控制按钮显示', async () => {
    const hasIncBtn = await page.$eval(`
      #app [sfr-f="input-number-1"] .el-input-number__increase,
      #app [sfr-f="input-number-1"] .ant-input-number-handler.ant-input-number-handler-up`, $el => {
      return !!$el;
    });
    const hasDecBtn = await page.$eval(`
      #app [sfr-f="input-number-1"] .el-input-number__decrease,
      #app [sfr-f="input-number-1"] .ant-input-number-handler.ant-input-number-handler-down`,$el => {
      return !!$el;
    });
    expect(hasIncBtn).toBeTruthy();
    expect(hasDecBtn).toBeTruthy();
  });

  let antSkip = test;
  if(uikit === 'ant-design') {
    antSkip = test.skip;
  }

  antSkip('控制按钮不显示', async () => {
    await expect(page.$eval(`
      #app [sfr-f="input-number-2"] .el-input-number__increase`, $el => {
      return !!$el;
    })).rejects.toThrow(); //Error: failed to find element matching selector ...
    await expect(page.$eval(`
      #app [sfr-f="input-number-2"] .el-input-number__decrease`, $el => {
      return !!$el;
    })).rejects.toThrow(); //Error: failed to find element matching selector ...
  });

  antSkip('控制按钮在两侧', async () => {
    const input1 = await boundOf(page, '#app [sfr-f="input-number-1"] input');
    const incBtn = await boundOf(page, '#app [sfr-f="input-number-1"] .el-input-number__increase');
    const decBtn = await boundOf(page, '#app [sfr-f="input-number-1"] .el-input-number__decrease');

    expect(decBtn.left).toEqual(input1.left);
    expect(incBtn.right).toEqual(input1.right);
    expect(decBtn.top).toEqual(input1.top);
    expect(incBtn.top).toEqual(input1.top);
    expect(decBtn.bottom).toEqual(input1.bottom);
    expect(incBtn.bottom).toEqual(input1.bottom);
  });

  test('控制按钮在右侧', async () => {
    const input1 = await boundOf(page, '#app [sfr-f="input-number-1"] input');
    const incBtn = await boundOf(page, `
    #app [sfr-f="input-number-1"] .el-input-number__increase,
    #app [sfr-f="input-number-1"] .ant-input-number-handler.ant-input-number-handler-up`);
    const decBtn = await boundOf(page, `
    #app [sfr-f="input-number-1"] .el-input-number__decrease,
    #app [sfr-f="input-number-1"] .ant-input-number-handler.ant-input-number-handler-down`);

    expect(incBtn.top).toEqual(input1.top);
    expect(decBtn.bottom).toEqual(input1.bottom);
    expect(incBtn.right).toEqual(input1.right);
    expect(decBtn.right).toEqual(input1.right);
    expect(incBtn.left).toEqual(decBtn.left);
  });
})
