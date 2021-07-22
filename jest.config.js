const _ = require('lodash');

const fs = require('fs-extra');
const { version } = fs.readJsonSync('./node_modules/vue/package.json');

module.exports = (uikit)=>{
  return {
    preset: '@vue/cli-plugin-unit-jest',
    testMatch: ['**/test/unit/**/*.spec.[jt]s?(x)'],
    globals: {
      _,
      isVue2: version.startsWith('2.'),
      uikit,
    },
    setupFiles: [
      `<rootDir>/test/unit/_setup_/setup.common.js`,
      `<rootDir>/test/unit/_setup_/setup.${uikit}.js`,
    ],
    collectCoverage: true,
    collectCoverageFrom: [
      `src/ui-kit/common/**/*.{js,vue}`,
      `src/ui-kit/${uikit}/**/*.{js,vue}`,
      `!src/ui-kit/${uikit}/**/*-toolbar.{js,vue}`,
      `!src/ui-kit/${uikit}/**/*-editor.{js,vue}`,
      `!src/ui-kit/${uikit}/**/*-schema.{js,vue}`,
    ],
  }
}
