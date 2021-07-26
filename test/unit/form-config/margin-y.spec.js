describe(`表单属性-行间距`, () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:4452/?schema=form-config/margin-y', {
      waitUntil: 'networkidle0',
    });
  });

  async function boundOf(selector) {
    const res = await page.$eval(selector, $root => {
      const { bottom, height, left, right, top, width, x, y } = $root.getBoundingClientRect();
      return { bottom, height, left, right, top, width, x, y };
    });
    return res;
  }

  test('默认距离 15px', async () => {
    const input1 = await boundOf('#app [sfr-f="input-1"]');
    const input2 = await boundOf('#app [sfr-f="input-2"]');
    expect(input2.top - input1.bottom).toEqual(15);
  });

  test('设置为 20px', async () => {
    await page.evaluate(()=>{
      window.$form.schema.formConf = {
        marginY: 20
      }
    });

    const input1 = await boundOf('#app [sfr-f="input-1"]');
    const input2 = await boundOf('#app [sfr-f="input-2"]');
    expect(input2.top - input1.bottom).toEqual(20);
  });

  test('子表单独立 marginY', async () => {
    await page.evaluate(()=>{
      window.$form.schema.formConf = {
        marginY: 20
      }
    });

    const input1 = await boundOf('#app [sfr-f="input-1"]');
    const input2 = await boundOf('#app [sfr-f="input-2"]');
    // const subform1 = await boundOf('#app [sfr-f="subform-1"]');
    const input3 = await boundOf('#app [sfr-f="subform-1"] [sfr-f="input-3"]');
    const input4 = await boundOf('#app [sfr-f="subform-1"] [sfr-f="input-4"]');
    const input5 = await boundOf('#app [sfr-f="input-5"]');
    expect(input2.top - input1.bottom).toEqual(20);
    expect(input3.top - input2.bottom).toEqual(20);
    expect(input4.top - input3.bottom).toEqual(5);
    expect(input5.top - input4.bottom).toEqual(20);
  });
})
