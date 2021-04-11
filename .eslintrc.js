module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 'plugin:vue/essential',
    // '@vue/airbnb',
    'plugin:vue/recommended',
  ],
  ignorePatterns: ["temp.js", "**/node_modules/*"],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'error',
    'no-param-reassign': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'vue/valid-v-model': 'off',
    'vue/no-deprecated-v-bind-sync': 'off',
  },
};
