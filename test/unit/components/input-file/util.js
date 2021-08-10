import path from 'path'

export async function uploadFile(page, field, file) {
  const uploadEle = await page.$(`#app [sfr-f="${field}"] input[type="file"]`);
  const uploadFile = file || path.resolve(__dirname, './banner.jpg');
  await uploadEle.uploadFile(uploadFile);
}
