import TestSchema from '../test.schema.json'

export default {
  data() {
    return {
      schema: {},
      formData: {}
    };
  },
  computed: {
    dataStr() {
      return JSON.stringify(this.formData, null, 2);
    }
  },
  created() {
    const query = {};
    window.location.search
      .replace('?', '')
      .split('&')
      .forEach(q => {
        const [k, v] = q.split('=');
        query[k] = v;
      })
    if(query.schema) {
      fetch(`http://localhost:4451/${query.schema}.schema.json`)
        .then(response => response.json())
        .then(schema => this.schema = schema);
    } else {
      this.schema = TestSchema;
    }
    window.$form = this;
  },
}