import { deleteIn } from '../../util'

describe('数字框：精度', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/input-number/precision`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });
  beforeEach(async ()=> {
    await deleteIn(page, 'input-number-1');
  });

  test('补零', async () => {
    const inputSelector = '#app [sfr-f="input-number-1"] input';
    await page.type(inputSelector, '0.3');
    await page.$eval(inputSelector, $el => {
      $el.blur();
    });
    await delay(300); // wait for value change in ant-design
    const value = await page.$eval(inputSelector, $el => {
      return $el.value;
    });
    
    expect(value).toEqual('0.30');
  });

  describe('舍尾', () => {
    test('四舍', async () => {
      const inputSelector = '#app [sfr-f="input-number-1"] input';
      await page.type(inputSelector, '0.3349');
      await page.$eval(inputSelector, $el => {
        $el.blur();
      });
      await delay(300); // wait for value change in ant-design
      const value = await page.$eval(inputSelector, $el => {
        return $el.value;
      });
      
      expect(value).toEqual('0.33');
    });

    test('五入', async () => {
      const inputSelector = '#app [sfr-f="input-number-1"] input';
      await page.type(inputSelector, '0.3351');
      await page.$eval(inputSelector, $el => {
        $el.blur();
      });
      await delay(300); // wait for value change in ant-design
      const value = await page.$eval(inputSelector, $el => {
        return $el.value;
      });
      
      expect(value).toEqual('0.34');
    });
  });
})
