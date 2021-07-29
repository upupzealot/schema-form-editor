describe('文本框：自适高度', () => {
  let page = null;
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(`http://localhost:${pagePort}/?schema=components/input/autosize`, {
      waitUntil: 'networkidle0',
    });
    await delay(1000);
  });

  async function heightOf(field) {
    const height = await page.$eval(`#app [sfr-f="${field}"] textarea`, $el => {
      return $el.clientHeight;
    });
    return height;
  }
  async function isScrolled(field) {
    const isScrolled = await page.$eval(`#app [sfr-f="${field}"] textarea`, $el => {
      return $el.scrollHeight !== $el.clientHeight;
    });
    return isScrolled;
  }

  async function typeIn(field, content) {
    await page.type(`#app [sfr-f="${field}"] textarea`, content);
  }
  async function deleteIn(field) {
    await page.$eval(`#app [sfr-f="${field}"] textarea`, $el => $el.value = '');
    await page.type(`#app [sfr-f="${field}"] textarea`, ' ');
    await page.keyboard.press('Backspace');
  }

  test('无自适应', async () => {
    const oldHeight = await heightOf('input-1');
    await typeIn('input-1', 'aaa\nbbb\nccc\nddd');
    const newHeight = await heightOf('input-1');
    expect(newHeight).toEqual(oldHeight);

    const scrolled = await isScrolled('input-1');
    expect(scrolled).toBeTruthy();
  });

  test('自适应高度', async () => {
    const height1 = await heightOf('input-1');
    let height2 = await heightOf('input-2');
    expect(height2).toEqual(height1);

    await typeIn('input-2', 'aaa\nbbb\nccc\nddd');
    height2 = await heightOf('input-2');
    expect(height2).toBeGreaterThan(height1);
    const scrolled = await isScrolled('input-2');
    expect(scrolled).not.toBeTruthy();

    await deleteIn('input-2');
    height2 = await heightOf('input-2');
    expect(height2).toEqual(height1);
  });

  test('最小行数', async () => {
    let height1 = await heightOf('input-1');
    let height3 = await heightOf('input-3');
    expect(height3).toBeGreaterThan(height1);

    await typeIn('input-3', 'aaa\nbbb\nccc\nddd');
    let newHeight3 = await heightOf('input-3');
    expect(newHeight3).toBeGreaterThan(height3);
    const scrolled = await isScrolled('input-3');
    expect(scrolled).not.toBeTruthy();

    await deleteIn('input-3');
    newHeight3 = await heightOf('input-3');
    expect(newHeight3).toEqual(height3);
  });

  test('最大行数', async () => {
    let height1 = await heightOf('input-1');
    let height4 = await heightOf('input-4');
    expect(height4).toEqual(height1);

    await typeIn('input-4', 'aaa\nbbb\nccc');
    let newHeight4 = await heightOf('input-4');
    expect(newHeight4).toBeGreaterThan(height4);
    let scrolled = await isScrolled('input-4');
    expect(scrolled).not.toBeTruthy();

    await typeIn('input-4', '\naaa\nbbb\nccc');
    newHeight4 = await heightOf('input-4');
    expect(newHeight4).toBeGreaterThan(height4);
    scrolled = await isScrolled('input-4');
    expect(scrolled).toBeTruthy();
  });
})
