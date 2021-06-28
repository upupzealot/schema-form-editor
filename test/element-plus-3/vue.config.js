const { resolve } = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('../../src'),
      }
    },
  }
};
