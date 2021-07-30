const fs = require('fs-extra');
const { version } = fs.readJsonSync('./node_modules/vue/package.json');
const isVue2 = version.startsWith('2.');

module.exports = uikit=>{
  return {
    preset: '@vue/cli-plugin-unit-jest',
    transform: isVue2 ? {} : {
      '^.+\\.vue$': 'vue-jest',
    },
    testEnvironment: './test/unit/_setup_/puppeteer/enviroment.js',
    testMatch: ['**/test/unit/**/*.spec.[jt]s?(x)'],
    globals: {
      isVue2,
      uikit,
    },
    setupFiles: [
      `<rootDir>/test/unit/_setup_/setup.common.js`,
      `<rootDir>/test/unit/_setup_/setup.${uikit}.js`,
    ],
    setupFilesAfterEnv: [
      '<rootDir>/test/unit/_setup_/setup-after-env.js',
    ],
    globalSetup: './test/unit/_setup_/setup.js',
    globalTeardown: './test/unit/_setup_/teardown.js',
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
