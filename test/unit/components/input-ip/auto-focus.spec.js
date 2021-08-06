import { deleteIn } from '../../util'

describe('IP框：自动焦点', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/input-ip/auto-focus`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  function inputSelector(field, n) {
    if(uikit === 'element-ui') {
      return `#app [sfr-f="${field}"] .ip-snippet:nth-child(${n}) input`;
    }
    if(uikit === 'ant-design') {
      return `#app [sfr-f="${field}"] input.ip-snippet:nth-child(${n})`;
    }
  }

  describe('焦点自动后移', ()=>{
    test('满三位', async () => {
      await page.type(inputSelector('input-ip-1', 1), '111');
      const isFocus2 = await page.$eval(inputSelector('input-ip-1', 2), $el => {
        return $el === document.activeElement;
      });
      expect(isFocus2).toBeTruthy();
    });

    test('超过 25', async () => {
      await page.type(inputSelector('input-ip-1', 2), '26');
      const isFocus3 = await page.$eval(inputSelector('input-ip-1', 3), $el => {
        return $el === document.activeElement;
      });
      expect(isFocus3).toBeTruthy();
    });

    test('输入 . 后 ', async () => {
      await page.type(inputSelector('input-ip-1', 3), '11.');
      const isFocus4 = await page.$eval(inputSelector('input-ip-1', 4), $el => {
        return $el === document.activeElement;
      });
      expect(isFocus4).toBeTruthy();
    });
  });

  describe('焦点自动前移', ()=>{
    beforeAll(async () => {
      await page.focus(inputSelector('input-ip-2', 1));
      await page.keyboard.type('111.111.111.111')
    });

    test('清空当前分段', async () => {
      await deleteIn(page, inputSelector('input-ip-2', 4));
      const isFocus3 = await page.$eval(inputSelector('input-ip-2', 3), $el => {
        return $el === document.activeElement;
      });
      expect(isFocus3).toBeTruthy();

      await deleteIn(page, inputSelector('input-ip-2', 3));
      const isFocus2 = await page.$eval(inputSelector('input-ip-2', 2), $el => {
        return $el === document.activeElement;
      });
      expect(isFocus2).toBeTruthy();

      await deleteIn(page, inputSelector('input-ip-2', 2));
      const isFocus1 = await page.$eval(inputSelector('input-ip-2', 1), $el => {
        return $el === document.activeElement;
      });
      expect(isFocus1).toBeTruthy();
    });
  });
})
