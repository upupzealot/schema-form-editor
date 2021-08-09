import path from 'path'

describe('文件选择：文件数据', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/input-file/file-choose`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  async function uploadFile(field) {
    const uploadEle = await page.$(`#app [sfr-f="${field}"] input[type="file"]`);
    const uploadFile = path.resolve(__dirname, './banner.jpg');
    await uploadEle.uploadFile(uploadFile);
  }

  test('文件数据', async () => {
    await uploadFile('input-file-1');
    await delay(500);
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
})
