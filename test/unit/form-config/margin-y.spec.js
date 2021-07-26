import { boundOf } from '../util'

describe(`表单属性-行间距`, () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=form-config/margin-y`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('默认距离 15px', async () => {
    const input1 = await boundOf(page, '#app [sfr-f="input-1"]');
    const input2 = await boundOf(page, '#app [sfr-f="input-2"]');
    expect(input2.top - input1.bottom).toEqual(15);
  });

  test('设置为 20px', async () => {
    await page.evaluate(()=>{
      window.$form.schema.formConf = {
        marginY: 20
      }
    });
    await delay(1000);

    const input1 = await boundOf(page, '#app [sfr-f="input-1"]');
    const input2 = await boundOf(page, '#app [sfr-f="input-2"]');
    expect(input2.top - input1.bottom).toEqual(20);
  });

  describe(`子表单独立行间距`, () => {
    beforeAll(async () => {
      await page.evaluate(()=>{
        window.$form.schema.formConf = {
          marginY: 20
        }
      });
      await delay(1000);
    });

    test('父表单维持间距 20px', async () => {
      const input2 = await boundOf(page, '#app [sfr-f="input-2"]');
      const input3 = await boundOf(page, '#app [sfr-f="subform-1"] [sfr-f="input-3"]');
      const input4 = await boundOf(page, '#app [sfr-f="subform-1"] [sfr-f="input-4"]');
      const input5 = await boundOf(page, '#app [sfr-f="input-5"]');
      expect(input3.top - input2.bottom).toEqual(20);
      expect(input5.top - input4.bottom).toEqual(20);
    });

    test('子表单内间距 5px', async () => {
      const input3 = await boundOf(page, '#app [sfr-f="subform-1"] [sfr-f="input-3"]');
      const input4 = await boundOf(page, '#app [sfr-f="subform-1"] [sfr-f="input-4"]');
      expect(input4.top - input3.bottom).toEqual(5);
    });
  });

  describe(`容器独立行间距`, () => {
    beforeAll(async () => {
      await page.evaluate(()=>{
        window.$form.schema.formConf = {
          marginY: 20
        }
      });
      await delay(1000);
    });

    test('父表单维持间距 20px', async () => {
      const input5 = await boundOf(page, '#app [sfr-f="input-5"]');
      const input6 = await boundOf(page, '#app [sfr-f="wrapper-1"] [sfr-f="input-6"]');
      const input7 = await boundOf(page, '#app [sfr-f="wrapper-1"] [sfr-f="input-7"]');
      const input8 = await boundOf(page, '#app [sfr-f="input-8"]');
      expect(input6.top - input5.bottom).toEqual(20);
      expect(input8.top - input7.bottom).toEqual(20);
    });

    test('容器内间距 5px', async () => {
      const input6 = await boundOf(page, '#app [sfr-f="wrapper-1"] [sfr-f="input-6"]');
      const input7 = await boundOf(page, '#app [sfr-f="wrapper-1"] [sfr-f="input-7"]');
      expect(input7.top - input6.bottom).toEqual(5);
    });
  });

  describe(`列表独立行间距`, () => {
    beforeAll(async () => {
      await page.evaluate(()=>{
        window.$form.schema.formConf = {
          marginY: 20
        }
        window.$form.formData['item-list-1'] = [
          {},
          {}
        ]
      });
    });

    test('父表单维持间距 20px', async () => {
      const input8 = await boundOf(page, '#app [sfr-f="input-8"]');
      const itemList1 = await boundOf(page, '#app [sfr-f="item-list-1"]');
      const item0 = await boundOf(page, '#app [sfr-f="item-list-1"] [sfr-f="item-list-1[0]"]');
      const input11 = await boundOf(page, '#app [sfr-f="input-11"]');
      expect(item0.top - input8.bottom).toEqual(20);
      expect(input11.top - itemList1.bottom).toEqual(20);
    });

    test('列表项之间间距 5px', async () => {
      const item0 = await boundOf(page, '#app [sfr-f="item-list-1"] [sfr-f="item-list-1[0]"]');
      const item1 = await boundOf(page, '#app [sfr-f="item-list-1"] [sfr-f="item-list-1[1]"]');
      expect(item1.top - item0.bottom).toEqual(5);
    });

    test('列表项之内间距 5px', async () => {
      const item0input9 = await boundOf(page, '#app [sfr-f="item-list-1"] [sfr-f="item-list-1[0]"] [sfr-f="input-9"]');
      const item0input10 = await boundOf(page, '#app [sfr-f="item-list-1"] [sfr-f="item-list-1[0]"] [sfr-f="input-10"]');
      const item1input9 = await boundOf(page, '#app [sfr-f="item-list-1"] [sfr-f="item-list-1[1]"] [sfr-f="input-9"]');
      const item1input10 = await boundOf(page, '#app [sfr-f="item-list-1"] [sfr-f="item-list-1[1]"] [sfr-f="input-10"]');
      expect(item0input10.top - item0input9.bottom).toEqual(5);
      expect(item1input10.top - item1input9.bottom).toEqual(5);
    });
  });
});
