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
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'error',
    'no-param-reassign': 'off',
    'arrow-parens': ['error', 'as-needed'],
  },
};
