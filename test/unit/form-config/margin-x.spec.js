import { boundOf } from '../util'

describe(`表单属性-列间距`, () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=form-config/margin-x`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('默认距离 20px', async () => {
    const input1 = await boundOf(page, '#app [sfr-f="input-1"]');
    const input2 = await boundOf(page, '#app [sfr-f="input-2"]');
    expect(input2.left - input1.right).toEqual(20);
  });

  test('设置为 15px', async () => {
    await page.evaluate(()=>{
      window.$form.schema.formConf = {
        marginX: 15
      }
    });
    await delay(1000);

    const input1 = await boundOf(page, '#app [sfr-f="input-1"]');
    const input2 = await boundOf(page, '#app [sfr-f="input-2"]');
    expect(input2.left - input1.right).toEqual(15);
  });

  describe(`子表单独立列间距`, () => {
    beforeAll(async () => {
      await page.evaluate(()=>{
        window.$form.schema.formConf = {
          marginX: 20
        }
      });
      await delay(1000);
    });

    test('父表单维持间距 20px', async () => {
      const input3 = await boundOf(page, '#app [sfr-f="input-3"]');
      const input4 = await boundOf(page, '#app [sfr-f="subform-1"] [sfr-f="input-4"]');
      const input5 = await boundOf(page, '#app [sfr-f="subform-1"] [sfr-f="input-5"]');
      const input6 = await boundOf(page, '#app [sfr-f="input-6"]');
      expect(input4.left - input3.right).toEqual(20);
      expect(input6.left - input5.right).toEqual(20);
    });

    test('子表单内间距 5px', async () => {
      const input4 = await boundOf(page, '#app [sfr-f="subform-1"] [sfr-f="input-4"]');
      const input5 = await boundOf(page, '#app [sfr-f="subform-1"] [sfr-f="input-5"]');
      expect(input5.left - input4.right).toEqual(5);
    });
  });
});