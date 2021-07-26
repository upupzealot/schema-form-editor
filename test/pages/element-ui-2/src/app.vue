<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1 style="color: #ccc;">
          Element UI & Vue 2.x
        </h1>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <FormRender
                :schema="schema"
                :data="formData"
              />
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <pre>{{ dataStr }}</pre>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import FormRender from '../../../../src/ui-kit/element-ui'
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
