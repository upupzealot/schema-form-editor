const processArgv = process.argv;
const isVue3 = processArgv.includes('--vue3');
process.env.IS_VUE3 = isVue3;

module.exports = {
  pages: {
    app: {
      entry: isVue3 ? 'src/main3.js' : 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  lintOnSave: false,
};
