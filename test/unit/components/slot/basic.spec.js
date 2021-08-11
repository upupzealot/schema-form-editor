describe('插槽', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/slot/basic&slotName=test&slotComponent=slot-test`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('基本渲染', async () => {
    const hasSlot = await page.$eval('#app [sfr-f="slot-1"]', $el => {
      return !!$el;
    });
    expect(hasSlot).toBeTruthy();
  });

  test('数据绑定', async () => {
    const innerText = await page.$eval(`#app [sfr-f="slot-1"] .el-form-item__content,
    #app [sfr-f="slot-1"] .ant-form-item-control`, $el => {
      return $el.innerText;
    });
    expect(innerText).toEqual('Slot: slot-1');
  });
})
