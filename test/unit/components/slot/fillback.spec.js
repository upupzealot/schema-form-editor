describe('插槽：数据回填', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/slot/full-demo&data=components/slot/full-demo&slotName=aaa,bbb,ccc,ddd&slotComponent=upper-lower-input-${uikit}`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('基础插槽', async () => {
    const value = await page.$eval('#app [sfr-f="slot-1"] input', $el => {
      return $el.value;
    });
    expect(value).toEqual('aaa');
  });

  test('容器插槽', async () => {
    const value = await page.$eval('#app [sfr-f="wrapper-1"] [sfr-f="slot-2"] input', $el => {
      return $el.value;
    });
    expect(value).toEqual('bbb');
  });

  test('子表单插槽', async () => {
    const value = await page.$eval('#app [sfr-f="subform-1"] [sfr-f="slot-3"] input', $el => {
      return $el.value;
    });
    expect(value).toEqual('ccc');
  });

  test('列表插槽', async () => {
    for(let i = 0; i < 2; i++) {
      const value = await page.$eval(`#app [sfr-f="item-list-1[${i}]"] [sfr-f="slot-4"] input`, $el => {
        return $el.value;
      });
      expect(value).toEqual(`ddd-${i + 1}`);
    }
  });
})
