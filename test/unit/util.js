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
