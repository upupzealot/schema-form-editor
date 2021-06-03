function create({ id, name, schemaStr }) {
  const schema = schemaStr ? JSON.parse(schemaStr) : {};
  if(name) {
    schema.name = name;
  }
  localStorage.setItem(id, JSON.stringify(schema || {}));
  
  const schemaList = list();
  schemaList.push({ id, name });
  localStorage.setItem('$schemaList', JSON.stringify(schemaList));

  select(id);
}

function list() {
  let schemaStr = localStorage.getItem('$schemaList');
  let schemaList = [];
  if(schemaStr) {
    schemaList = JSON.parse(schemaStr);
  } else {
    schemaList = [{
      id: 'default',
      name: '默认',
    }]
  }
  return schemaList;
}

function select(id) {
  localStorage.setItem('schemaId', id);
}

function currentId() {
  return localStorage.getItem('schemaId') || 'default';
}

function get(id) {
  const schemaStr = localStorage.getItem(id);
  if(schemaStr) {
    return JSON.parse(schemaStr);
  } else {
    return null;
  }
}

function update(id, schema) {
  localStorage.setItem(id, JSON.stringify(schema));
}

function delet(id) {
  localStorage.removeItem(id);
  let schemaList = list();
  schemaList = schemaList.filter(p => p.id !== id);
  localStorage.setItem('$schemaList', JSON.stringify(schemaList));
}

export default {
  create,
  list,
  select,
  currentId,
  get,
  update,
  delet,
};
