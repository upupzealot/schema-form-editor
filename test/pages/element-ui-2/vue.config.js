const { resolve } = require('path');

module.exports = {
  devServer: {
    port: 4442,
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('../../../src'),
      }
    },
  }
};
