import { boundOf } from '../../util'

describe('数字框：控制按钮', () => {
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

  function Less1(num1, num2) {
    expect(Math.abs(num2 - num1)).toBeLessThanOrEqual(1);
  }

  antSkip('控制按钮在两侧', async () => {
    const input1 = await boundOf(page, '#app [sfr-f="input-number-1"] input');
    const incBtn = await boundOf(page, '#app [sfr-f="input-number-1"] .el-input-number__increase');
    const decBtn = await boundOf(page, '#app [sfr-f="input-number-1"] .el-input-number__decrease');

    Less1(decBtn.left, input1.left);
    Less1(incBtn.right, input1.right);
    Less1(decBtn.top, input1.top);
    Less1(incBtn.top, input1.top);
    Less1(decBtn.bottom, input1.bottom);
    Less1(incBtn.bottom, input1.bottom);
  });

  test('控制按钮在右侧', async () => {
    const input1 = await boundOf(page, '#app [sfr-f="input-number-1"] input');
    const incBtn = await boundOf(page, `
    #app [sfr-f="input-number-1"] .el-input-number__increase,
    #app [sfr-f="input-number-1"] .ant-input-number-handler.ant-input-number-handler-up`);
    const decBtn = await boundOf(page, `
    #app [sfr-f="input-number-1"] .el-input-number__decrease,
    #app [sfr-f="input-number-1"] .ant-input-number-handler.ant-input-number-handler-down`);

    Less1(incBtn.top, input1.top);
    Less1(decBtn.bottom, input1.bottom);
    Less1(incBtn.right, input1.right);
    Less1(decBtn.right, input1.right);
    Less1(incBtn.left, decBtn.left);
  });
})
