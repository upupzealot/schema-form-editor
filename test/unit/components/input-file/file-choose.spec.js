import { uploadFile } from './util'

describe('文件选择：文件数据', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/input-file/file-choose`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('文件数据', async () => {
    await uploadFile(page, 'input-file-1');
    const fileSelected = await page.evaluate(() => {
      const formData = window.$form.formData;
      const file = formData['input-file-1'];
      return {
        name: file.name,
        size: file.size,
        type: file.type,
      };
    });
    expect(fileSelected.name).toEqual('banner.jpg');
    expect(fileSelected.size).toEqual(335797);
    expect(fileSelected.type).toEqual('image/jpeg');
  });

  test('文件名展示', async () => {
    await uploadFile(page, 'input-file-2');
    const textValue = await page.$eval(`#app [sfr-f="input-file-2"] input[type="text"]`, $el => {
      return $el.value;
    });
    expect(textValue).toEqual('banner.jpg');
  });
})
