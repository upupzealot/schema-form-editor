describe('数字框：最大值/最小值', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/input-number/max-min`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('最大值', async () => {
    const inputSelector = '#app [sfr-f="input-number-1"] input';
    await page.type(inputSelector, '11');
    await page.$eval(inputSelector, $el => {
      $el.blur();
    });
    await delay(300); // wait for value change in ant-design
    const value = await page.$eval(inputSelector, $el => {
      return $el.value;
    });
    
    expect(value).toEqual('10');
  });

  test('最小值', async () => {
    const inputSelector = '#app [sfr-f="input-number-2"] input';
    await page.type(inputSelector, '1');
    await page.$eval(inputSelector, $el => {
      $el.blur();
    });
    await delay(300); // wait for value change in ant-design
    const value = await page.$eval(inputSelector, $el => {
      return $el.value;
    });
    
    expect(value).toEqual('2');
  });
})
