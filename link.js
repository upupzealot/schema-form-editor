const fs = require('fs-extra');
const { execSync } = require('child_process')

const { version } = fs.readJsonSync('./node_modules/vue/package.json');
console.log('vue version:', version)
let isVue2 = version.startsWith('2.');
if(!isVue2) {
  console.log('linking: vue@2')
  execSync('npm link --production', {
    cwd: './node_modules/vue2',
    stdio: 'inherit',
  });
  execSync('npm link vue');

  console.log('linking: vuex@3')
  execSync('npm link --production', {
    cwd: './node_modules/vuex3',
    stdio: 'inherit',
  });
  execSync('npm link vuex');

  console.log('linking: vuedraggable2')
  execSync('npm link --production', {
    cwd: './node_modules/vuedraggable2',
    stdio: 'inherit',
  });
  execSync('npm link vuedraggable');

  console.log('linking: ant-design-vue1')
  execSync('npm link --production', {
    cwd: './node_modules/ant-design-vue1',
    stdio: 'inherit',
  });
  execSync('npm link ant-design-vue');
}
