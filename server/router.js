const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const KoaRouter = require('@koa/router');

const router = new KoaRouter();

router.get('/', ctx => {
  ctx.body = 'Hello World';
});

router.get('/api/status', async ctx => {
  ctx.body = {};
})

router.get('/api/schema', async ctx => {
  const { projectId: rootDir  } = ctx.query;
  if(!rootDir || !fs.existsSync(rootDir)) {
    ctx.body = [];
    return;
  }

  const listPro = new Promise((resolve, reject) => {
    glob(`${rootDir}/**/*.schema.json`, function (err, files) {
      if(err) {
        return reject(err);
      } else {
        return resolve(files);
      }
    })
  });
  const list = await listPro;
  const tree = {};
  list.forEach(file => {
    const relativePath = path.relative(rootDir, file);
    const treePaths = relativePath.split('/');

    let currentNode = tree;
    treePaths.forEach((p, i) => {
      if(!currentNode.data) {
        currentNode.data = [];
      }

      const id = treePaths.slice(0, i + 1).join('/');
      let node = _.find(currentNode.data, { id });
      if(node) {
        currentNode = node;
      } else {
        if(p.endsWith('.schema.json')) {
          const schema = fs.readJsonSync(file);
          const node = {
            id,
            label: schema.name || p.replace('.schema.json', ''),
            isSchema: true,
          }
          currentNode.data.push(node);
        } else {
          const node = {
            id,
            label: p,
          };
          currentNode.data.push(node);
          currentNode = node;
        }
      }
    });
  });

  ctx.body = tree.data;
});

router.get('/api/schema/id', async ctx => {
  const { projectId: rootDir, id } = ctx.query;
  if(!rootDir || !fs.existsSync(rootDir) || !id) {
    ctx.body = {};
    return;
  }

  const file = path.resolve(rootDir, id);
  const schema = fs.readJSONSync(file);
  ctx.body = {
    schema,
  };
});

router.post('/api/schema/id', async ctx => {
  const { projectId: rootDir, id } = ctx.query;
  if(!rootDir || !fs.existsSync(rootDir) || !id) {
    ctx.body = {};
    return;
  }

  const { schema } = ctx.request.body;
  const file = path.resolve(rootDir, id);
  fs.writeJSONSync(file, schema, { spaces: 2 });
  ctx.body = {};
});

router.get('(.*)', async ctx => {
  ctx.code = 404;
  ctx.errorMsg = 'Not Found';
});

module.exports = router;
