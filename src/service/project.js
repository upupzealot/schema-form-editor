function create({ id, name, cwd }) {  
  const projectList = list();
  projectList.push({ id, name, cwd });
  localStorage.setItem('$projectList', JSON.stringify(projectList));

  select(id);
}

function list() {
  let projectListStr = localStorage.getItem('$projectList');
  let projectList = [];
  if(projectListStr) {
    projectList = JSON.parse(projectListStr);
  }
  return projectList;
}

function select(id) {
  localStorage.setItem('$projectId', id);
}

function currentId() {
  return localStorage.getItem('$projectId') || 'default';
}

function delet(id) {
  localStorage.removeItem(id);
  let projectList = list();
  projectList = projectList.filter(p => p.id !== id);
  localStorage.setItem('$projectList', JSON.stringify(projectList));
}

export default {
  create,
  list,
  select,
  currentId,
  delet,
};
