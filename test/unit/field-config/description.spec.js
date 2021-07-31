describe('字段属性-字段描述', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=field-config/description`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  test('展示描述图标', async () => {
    const $input1 = await page.$('#app [sfr-f="input-1"] label i, #app [sfr-f="input-1"] label svg');
    expect($input1).toBeTruthy();
  });

  describe('弹出描述气泡', () => {
    let page = null;
    beforeAll(async () => {
      page = await brandnewPage(`http://localhost:${pagePort}/?schema=field-config/description`);
      await delay(1000);
    }, 10 * 1000);
    afterAll(async () => {
      if(browser) {
        const browser = await page.browser();
        await browser.close();
      }
    });

    test('弹出描述气泡', async () => {  
      await page.hover('#app [sfr-f="input-1"] label i, #app [sfr-f="input-1"] label svg');
      await delay(1000);
  
      const tooltipObjs = await page.$$eval('[role="tooltip"]', $eles => {
        return $eles.map($el => {
          return {
            text: $el.textContent,
            visible: !!($el.offsetWidth || $el.offsetHeight || $el.getClientRects().length),
          }
        })
      });
      expect(tooltipObjs).toContainEqual({
        text: '这是 input-1 的字段描述',
        visible: true,
      });
    });
  });

  describe('描述内容换行', () => {
    let page = null;
    beforeAll(async () => {
      page = await brandnewPage(`http://localhost:${pagePort}/?schema=field-config/description`);
      await delay(1000);
    }, 10 * 1000);
    afterAll(async () => {
      if(browser) {
        const browser = await page.browser();
        await browser.close();
      }
    });

    test('描述内容换行', async () => {
      await page.hover('#app [sfr-f="input-2"] label i, #app [sfr-f="input-2"] label svg');
      await delay(200);
  
      const tooltipObjs = await page.$$eval('[role="tooltip"]', $eles => {
        return $eles.map($el => {
          return {
            text: $el.textContent,
            hasBr: /<br>/.test($el.innerHTML),
            visible: !!($el.offsetWidth || $el.offsetHeight || $el.getClientRects().length),
          }
        })
      });
      expect(tooltipObjs).toContainEqual({
        text: '这是 input-2 的字段描述这是 input-2 的字段描述',
        hasBr: true,
        visible: true,
      });
    });
  });

  describe('HTML 内容', () => {
    let page = null;
    beforeAll(async () => {
      page = await brandnewPage(`http://localhost:${pagePort}/?schema=field-config/description`);
      await delay(200);
    }, 10 * 1000);
    afterAll(async () => {
      if(browser) {
        const browser = await page.browser();
        await browser.close();
      }
    });

    test('HTML 内容', async () => {
      await page.hover('#app [sfr-f="input-3"] label i, #app [sfr-f="input-3"] label svg');
      await delay(200);
  
      const tooltipObjs = await page.$$eval('[role="tooltip"]', $eles => {
        return $eles.map($el => {
          const $span = $el.querySelector('span.html-test');
          const spanColor = $span && getComputedStyle($span).color;

          return {
            text: $el.textContent,
            spanColor,
            visible: !!($el.offsetWidth || $el.offsetHeight || $el.getClientRects().length),
          }
        })
      });
      expect(tooltipObjs).toContainEqual({
        text: '这是 input-3 的字段描述',
        spanColor: 'rgb(255, 0, 0)',
        visible: true,
      });
    });
  });
})
