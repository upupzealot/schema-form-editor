<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <h1 style="color: #ccc;">
          Ant Design Vue 2.x & Vue 3.x
        </h1>
      </a-layout-header>
      <a-layout-content>
        <a-row :gutter="20">
          <a-col :span="12">
            <a-card>
              <FormRender
                :schema="schema"
                :data="formData"
              />
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card>
              <pre>{{ dataStr }}</pre>
            </a-card>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import FormRender from '../../../../src/ui-kit/ant-design'
import TestSchema from '../../../test.schema.json'

export default {
  name: 'App',
  components: {
    FormRender,
  },
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
</script>
