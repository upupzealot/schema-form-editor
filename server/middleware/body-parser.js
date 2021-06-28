const koaBodyParser = require('koa-bodyparser');

module.exports = app => {
  app.use(koaBodyParser());
};
