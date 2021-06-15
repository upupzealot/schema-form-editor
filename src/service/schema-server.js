import axios from 'axios';
import schemaLocal from './schema-local'

async function create({ id, name, schemaStr }) {
  // TODO
}

async function list() {
  const { data } = await axios.get('http://127.0.0.1:4432/api/schema');
  return data;
}

async function get(id) {
  const res = await axios.get(`http://127.0.0.1:4432/api/schema/id`, {
    params: {
      id,
    }
  });
  return res;
}

async function update(id, schema) {
  const res = await axios.post(`http://127.0.0.1:4432/api/schema/id`,{
      schema,
    }, {
      params: {
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
  ...schemaLocal,
  create,
  list,
  get,
  update,
  delet,
  select,
  currentId
};
