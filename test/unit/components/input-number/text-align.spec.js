describe('数字框：文本对齐', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/input-number/text-align`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('默认：中间对齐', async () => {
    const inputSelector = '#app [sfr-f="input-number-1"] input';
    const align = await page.$eval(inputSelector, $el => {
      return getComputedStyle($el).textAlign;
    });
    
    expect(align).toEqual('center');
  });

  test('左对齐', async () => {
    const inputSelector = '#app [sfr-f="input-number-2"] input';
    const align = await page.$eval(inputSelector, $el => {
      return getComputedStyle($el).textAlign;
    });
    
    expect(align).toEqual('left');
  });

  test('右对齐', async () => {
    const inputSelector = '#app [sfr-f="input-number-3"] input';
    const align = await page.$eval(inputSelector, $el => {
      return getComputedStyle($el).textAlign;
    });
    
    expect(align).toEqual('right');
  });
})
