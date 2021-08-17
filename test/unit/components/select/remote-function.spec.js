describe('下拉选项：自定义函数', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/select/remote-function&data=components/select/remote-function`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('自定义函数：直接返回', async () => {
    if(uikit === 'element-ui') {
      const value = await page.$eval('#app [sfr-f="select-1"] .el-select input', $el => {
        return $el.value;
      });
      expect(value).toEqual('选项一');
    }
    if(uikit === 'ant-design') {
      const text = await page.$eval('#app [sfr-f="select-1"] .ant-select', $el => {
        return $el.textContent;
      });
      expect(text).toEqual('选项一');
    }
  });

  test('自定义函数：axios 远程拉取', async () => {
    if(uikit === 'element-ui') {
      const value = await page.$eval('#app [sfr-f="select-2"] .el-select input', $el => {
        return $el.value;
      });
      expect(value).toEqual('选项一');
    }
    if(uikit === 'ant-design') {
      const text = await page.$eval('#app [sfr-f="select-2"] .ant-select', $el => {
        return $el.textContent;
      });
      expect(text).toEqual('选项一');
    }
  });
});
