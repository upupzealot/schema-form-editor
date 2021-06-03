import schema from './schema'

const services = {
  schema
};

export default function get(name) {
  return services[name];
}
