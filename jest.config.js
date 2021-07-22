module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/test/unit/*.spec.[jt]s?(x)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/ui-kit/element-ui/**/*.{js,vue}',
    '!src/ui-kit/element-ui/**/*-toolbar.{js,vue}',
    '!src/ui-kit/element-ui/**/*-editor.{js,vue}',
    '!src/ui-kit/element-ui/**/*-schema.{js,vue}',
  ],
}
