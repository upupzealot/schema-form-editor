import project from './project'
import schemaLocal from './schema-local'
import schemaServer from './schema-server'
import server from './server'

const services = {
  project,
  server
};

export default function get(name) {
  if(name === 'schema') {
    const connected = server.status();
    return connected ? schemaServer : schemaLocal;
  } else {
    return services[name];
  }
}
