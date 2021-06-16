import axios from 'axios';
import schemaLocalSrv from './schema-local'
import projectSrv from './project'

async function create({ id, name, schemaStr }) {
  // TODO
}

async function list() {
  const projectId = projectSrv.currentId();
  const { data } = await axios.get('http://127.0.0.1:4432/api/schema', {
    params: {
      projectId,
    }
  });
  return data;
}

async function get(id) {
  const projectId = projectSrv.currentId();
  const res = await axios.get(`http://127.0.0.1:4432/api/schema/id`, {
    params: {
      projectId,
      id,
    }
  });
  return res;
}

async function update(id, schema) {
  const projectId = projectSrv.currentId();
  const res = await axios.post(`http://127.0.0.1:4432/api/schema/id`,{
      schema,
    }, {
      params: {
        projectId,
        id,
      }
    });
  return res;
  // TODO
}

async function delet(id) {
  // TODO
}

function select(id) {
  localStorage.setItem('$schemaIdServer', id);
}

function currentId() {
  return localStorage.getItem('$schemaIdServer') || 'default';
}

export default {
  ...schemaLocalSrv,
  create,
  list,
  get,
  update,
  delet,
  select,
  currentId
};
