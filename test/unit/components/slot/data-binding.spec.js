describe('插槽：数据回填', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/slot/full-demo&data=components/slot/full-demo-empty&slotName=aaa,bbb,ccc,ddd&slotComponent=upper-lower-input-${uikit}`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('基础插槽', async () => {
    const selector = '#app [sfr-f="slot-1"] input';
    await page.type(selector, 'asdqwe');
    const value = await page.$eval(selector, $el => {
      return $el.value;
    });
    expect(value).toEqual('asdqwe');
  });

  test('容器插槽', async () => {
    const selector = '#app [sfr-f="wrapper-1"] [sfr-f="slot-2"] input';
    await page.type(selector, 'asdqwe');
    const value = await page.$eval(selector, $el => {
      return $el.value;
    });
    expect(value).toEqual('asdqwe');
  });

  test('子表单插槽', async () => {
    const selector = '#app [sfr-f="subform-1"] [sfr-f="slot-3"] input';
    await page.type(selector, 'asdqwe');
    const value = await page.$eval(selector, $el => {
      return $el.value;
    });
    expect(value).toEqual('asdqwe');
  });

  test('列表插槽', async () => {
    for(let i = 0; i < 2; i++) {
      const selector = `#app [sfr-f="item-list-1[${i}]"] [sfr-f="slot-4"] input`;
      await page.type(selector, 'asdqwe');
      const value = await page.$eval(selector, $el => {
        return $el.value;
      });
      expect(value).toEqual('asdqwe');
    }
  });
})
