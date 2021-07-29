import { boundOf } from '../util'

describe('字段属性-布局', () => {
  let page = null;
  let formWidth = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=field-config/layout`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
    const formRect = await boundOf(page, '#app [sfr-form="$root"]');
    formWidth = formRect.width;
  });

  test('全列布局', async () => {
    const input1 = await boundOf(page, '#app [sfr-f="input-1"]');
    expect(input1.width).toBeCloseTo(formWidth, 1);
  });
  test('两列布局', async () => {
    const input21 = await boundOf(page, '#app [sfr-f="input-2-1"]');
    const input22 = await boundOf(page, '#app [sfr-f="input-2-2"]');
    expect(input21.width).toBeCloseTo((formWidth - 20) / 2, 1);
    expect(input22.width).toBeCloseTo((formWidth - 20) / 2, 1);
  });
  test('三列布局', async () => {
    const input31 = await boundOf(page, '#app [sfr-f="input-3-1"]');
    const input32 = await boundOf(page, '#app [sfr-f="input-3-2"]');
    const input33 = await boundOf(page, '#app [sfr-f="input-3-3"]');
    expect(input31.width).toBeCloseTo((formWidth - 20 * 2) / 3, 1);
    expect(input32.width).toBeCloseTo((formWidth - 20 * 2) / 3, 1);
    expect(input33.width).toBeCloseTo((formWidth - 20 * 2) / 3, 1);
  });
  test('四列布局', async () => {
    const input41 = await boundOf(page, '#app [sfr-f="input-4-1"]');
    const input42 = await boundOf(page, '#app [sfr-f="input-4-2"]');
    const input43 = await boundOf(page, '#app [sfr-f="input-4-3"]');
    const input44 = await boundOf(page, '#app [sfr-f="input-4-4"]');
    expect(input41.width).toBeCloseTo((formWidth - 20 * 3) / 4, 1);
    expect(input42.width).toBeCloseTo((formWidth - 20 * 3) / 4, 1);
    expect(input43.width).toBeCloseTo((formWidth - 20 * 3) / 4, 1);
    expect(input44.width).toBeCloseTo((formWidth - 20 * 3) / 4, 1);
  });
})
