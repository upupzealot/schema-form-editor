import { deleteIn } from '../../util'

describe('数字框：步长控制', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/input-number/step`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  async function clickIncBtnOf(field) {
    await page.click(`
      #app [sfr-f="${field}"] .el-input-number__increase,
      #app [sfr-f="${field}"] .ant-input-number-handler.ant-input-number-handler-up`);
  }

  test('默认步长：1', async () => {
    const inputSelector = '#app [sfr-f="input-number-1"] input';
    await page.type(inputSelector, '0.43');
    await page.$eval(inputSelector, $el => {
      $el.blur();
    });
    await clickIncBtnOf('input-number-1');
    await delay(300); // wait for value change in ant-design
    const value = await page.$eval(inputSelector, $el => {
      return $el.value;
    });
    
    expect(value).toEqual('1.43');
  });

  test('步长 10', async () => {
    const inputSelector = '#app [sfr-f="input-number-2"] input';
    await clickIncBtnOf('input-number-2');
    await delay(300); // wait for value change in ant-design
    const value = await page.$eval(inputSelector, $el => {
      return $el.value;
    });
    
    expect(value).toEqual('10');
  });

  let antSkip = describe;
  if(uikit === 'ant-design') {
    antSkip = describe.skip;
  }
  antSkip('严格步长', () => {
    beforeEach(async ()=> {
      await deleteIn(page, 'input-number-3');
    });

    test('四舍', async () => {
      const inputSelector = '#app [sfr-f="input-number-3"] input';
      await page.type(inputSelector, '0.49');
      await page.$eval(inputSelector, $el => {
        $el.blur();
      });
      await delay(300); // wait for value change in ant-design
      const value = await page.$eval(inputSelector, $el => {
        return $el.value;
      });
      
      expect(value).toEqual('0');
    });

    test('五入', async () => {
      const inputSelector = '#app [sfr-f="input-number-3"] input';
      await page.type(inputSelector, '0.51');
      await page.$eval(inputSelector, $el => {
        $el.blur();
      });
      await delay(300); // wait for value change in ant-design
      const value = await page.$eval(inputSelector, $el => {
        return $el.value;
      });
      
      expect(value).toEqual('1');
    });
  });
})
