const { resolve } = require('path');

module.exports = {
  devServer: {
    port: 4443,
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
