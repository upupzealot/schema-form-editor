export const boundOf = async (page, selector) => {
  const res = await page.$eval(selector, $root => {
    const { bottom, height, left, right, top, width, x, y } = $root.getBoundingClientRect();
    return { bottom, height, left, right, top, width, x, y };
  });
  return res;
}
