const Koa = require('koa');
const app = new Koa();

const cors = require('./middleware/cors');
const bodyParser = require('./middleware/body-parser');
const router = require('./router.js');

cors(app);
bodyParser(app);
app
  .use(router.routes())
  .use(router.allowedMethods());
 
app.listen(4432);
console.log('server started at:', 4432);
