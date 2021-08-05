export default [{
  name: 'IP（IPV4）',
  key: 'ip',
  func: (r, value, callback) => {
    const errMsg = '请输入正确的 IP 地址，每位 0~255 之间的整数';
    const snippets = value && value.split('.');
    if(snippets && snippets.length === 4) {
      for(let i = 0; i < 4; i++) {
        const snippet = snippets[i];
        let pass = /[\d]+/.test(snippet);
        if(!pass) {
          callback(new Error(errMsg));
          break;
        }
        const num = Number(snippet);
        pass = num >= 0 && num <= 255;
        if(!pass) {
          callback(new Error(errMsg));
          break;
        }
        if(!i && num === 0) {
          callback(new Error('首位不能为 0'));
        }
      }
    } else {
      callback(new Error(errMsg));
    }
    callback();
  }
}]
