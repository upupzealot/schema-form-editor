import project from './project'
import schema from './schema'
import server from './server'

const services = {
  project,
  schema,
  server
};

export default function get(name) {
  return services[name];
}
