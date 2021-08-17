describe('文件选择：可清空', () => {
  let page = null;
  beforeAll(async () => {
    page = await brandnewPage(`http://localhost:${pagePort}/?schema=components/select/clearable&data=components/select/clearable`);
    await delay(1000);
  }, 10 * 1000);
  afterAll(async () => {
    if(browser) {
      const browser = await page.browser();
      await browser.close();
    }
  });

  test('清空按钮展示', async () => {
    await page.hover('#app [sfr-f="select-1"]');
    await delay(1000);

    const btnVisible = await page.$(`
      #app [sfr-f="select-1"] .el-select__caret.el-icon-circle-close,
      #app [sfr-f="select-1"] .anticon.anticon-close-circle`, $el => {
      return !!$el;
    });

    expect(btnVisible).toBeTruthy();
  });

  test('清空数据', async () => {
    let value = await page.evaluate(async () => {
      return !!window.$form.formData['select-2']
    });
    expect(value).toBeTruthy();

    await page.hover('#app [sfr-f="select-2"]');
    await delay(1000);
    await page.click(`
      #app [sfr-f="select-2"] .el-select__caret.el-icon-circle-close,
      #app [sfr-f="select-2"] .anticon.anticon-close-circle`);

    value = await page.evaluate(async () => {
      return !!window.$form.formData['select-2']
    });
    expect(value).toBeFalsy();
  });
})
