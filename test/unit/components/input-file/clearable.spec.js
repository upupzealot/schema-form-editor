import { uploadFile } from './util'

describe('文件选择：可清空', () => {
  let page = null;
  beforeAll(async () => {
    page = await brandnewPage(`http://localhost:${pagePort}/?schema=components/input-file/clearable`);
    await delay(1000);
  }, 10 * 1000);
  // afterAll(async () => {
  //   if(browser) {
  //     const browser = await page.browser();
  //     await browser.close();
  //   }
  // });

  test('清空按钮展示', async () => {
    await uploadFile(page, 'input-file-1');
    await page.hover('#app [sfr-f="input-file-1"]');
    await delay(1000);

    const btnVisible = await page.$('#app [sfr-f="input-file-1"] .clear-btn', $el => {
      return !!$el;
    });

    expect(btnVisible).toBeTruthy();
  });

  test('清空数据', async () => {
    await uploadFile(page, 'input-file-2');
    let data = await page.evaluate(async () => {
      return {
        file: !!window.$form.formData['input-file-2']
      };
    });
    expect(data.file).toBeTruthy();

    await page.hover('#app [sfr-f="input-file-2"]');
    await delay(1000);
    await page.click('#app [sfr-f="input-file-2"] .clear-btn');

    data = await page.evaluate(async () => {
      return {
        file: !!window.$form.formData['input-file-2']
      };
    });
    expect(data.file).toBeFalsy();
  });

  test('清空文件名', async () => {
    await uploadFile(page, 'input-file-3');
    let filename = await page.$eval('#app [sfr-f="input-file-3"] input[type="text"]', async $el => {
      return $el.value;
    });
    expect(filename).toBeTruthy();

    await page.hover('#app [sfr-f="input-file-3"]');
    await delay(1000);
    await page.click('#app [sfr-f="input-file-3"] .clear-btn');

    filename = await page.$eval('#app [sfr-f="input-file-3"] input[type="text"]', async $el => {
      return $el.value;
    });
    expect(filename).toBeFalsy();
  });
})
