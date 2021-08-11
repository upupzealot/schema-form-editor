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
})
