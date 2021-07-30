const fs = require('fs-extra');
const { execSync } = require('child_process')

const { version } = fs.readJsonSync('./node_modules/vue/package.json');
console.log('vue version:', version)
let isVue3 = version.startsWith('3.');
if(!isVue3) {
  console.log('linking: vue@3')
  execSync('npm link --production', {
    cwd: './node_modules/vue3',
    stdio: 'inherit',
  });
  execSync('npm link vue');

  console.log('linking: vuex@4')
  execSync('npm link --production', {
    cwd: './node_modules/vuex4',
    stdio: 'inherit',
  });
  execSync('npm link vuex');

  console.log('linking: vuedraggable4')
  execSync('npm link --production', {
    cwd: './node_modules/vuedraggable4',
    stdio: 'inherit',
  });
  execSync('npm link vuedraggable');

  console.log('linking: ant-design-vue2')
  execSync('npm link --production', {
    cwd: './node_modules/ant-design-vue2',
    stdio: 'inherit',
  });
  execSync('npm link ant-design-vue');

  console.log('linking: @vue/test-utils')
  execSync('npm link --production', {
    cwd: './node_modules/vue-test-util-alias2',
    stdio: 'inherit',
  });
  execSync('npm link vue-test-util-alias');
}
