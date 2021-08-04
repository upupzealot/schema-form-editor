export const boundOf = async (page, selector) => {
  const res = await page.$eval(selector, $root => {
    const { bottom, height, left, right, top, width, x, y } = $root.getBoundingClientRect();
    return { bottom, height, left, right, top, width, x, y };
  });
  return res;
}
export const paddingOf = async (page, selector) => {
  const res = await page.$eval(selector, $root => {
    const styleObj = getComputedStyle($root);
    return {
      top: styleObj.getPropertyValue('padding-top'),
      left: styleObj.getPropertyValue('padding-left'),
      right: styleObj.getPropertyValue('padding-right'),
      bottom: styleObj.getPropertyValue('padding-bottom'),
    }
  });
  return res;
}
export const deleteIn = async (page, field) => {
  const selector = `#app [sfr-f="${field}"] input, #app [sfr-f="${field}"] textarea`;
  const tagName = await page.$eval(selector, async $el => {
    console.log($el.tagName)
    if($el.tagName === 'INPUT') {
      $el.focus();
      $el.select();
    } else {
      $el.value = '';
    }
    return $el.tagName;
  });
  if(tagName !== 'INPUT') { //textarea
    await page.type(selector, ' ');
  }
  await page.keyboard.press('Backspace');
}
