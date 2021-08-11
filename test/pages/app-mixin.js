import TestSchema from '../test.schema.json'

export default {
  data() {
    return {
      schema: {},
      formData: {},
      slotNames: [],
      slotComponent: 'div',
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

    // schema
    if(query.schema) {
      fetch(`http://localhost:4451/${query.schema}.schema.json`)
        .then(response => response.json())
        .then(schema => this.schema = schema);
    } else {
      this.schema = TestSchema;
    }

    // data
    if(query.data) {
      fetch(`http://localhost:4451/${query.data}.data.json`)
        .then(response => response.json())
        .then(data => this.formData = data);
    }

    // slot
    if(query.slotName) {
      this.slotNames = query.slotName.split(',');
    }
    if(query.slotComponent) {
      const comp = require(`../unit/components/slot/${query.slotComponent}.vue`)
      this.slotComponent = comp.default;
    }

    window.$form = this;
  },
}