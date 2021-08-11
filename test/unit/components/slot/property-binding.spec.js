describe('插槽：属性绑定', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/slot/full-demo&data=components/slot/full-demo&slotName=aaa,bbb,ccc,ddd&slotComponent=slot-test`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  describe('基础插槽', () => {
    test('基本渲染', async () => {
      const hasSlot = await page.$eval('#app [sfr-f="slot-1"]', $el => {
        return !!$el;
      });
      expect(hasSlot).toBeTruthy();
    });
  
    test('属性绑定', async () => {
      const innerText = await page.$eval(`#app [sfr-f="slot-1"] .el-form-item__content,
      #app [sfr-f="slot-1"] .ant-form-item-control`, $el => {
        return $el.innerText;
      });
      expect(innerText).toEqual('Slot: slot-1');
    });
  })
})
