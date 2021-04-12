import md5 from 'md5'

export const $id = function () {
  return md5(Date.now()).substr(0, 7);
}
