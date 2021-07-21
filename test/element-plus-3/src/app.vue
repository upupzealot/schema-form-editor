<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1 style="color: #ccc;">
          Element Plus & Vue 3.x
        </h1>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <FormRender
                :schema="TestSchema"
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
import FormRender from '../../../src/ui-kit/element-ui'
import TestSchema from '../../test.schema.json'

export default {
  name: 'App',
  components: {
    FormRender,
  },
  data() {
    return {
      TestSchema,
      formData: {}
    };
  },
  computed: {
    dataStr() {
      return JSON.stringify(this.formData, null, 2);
    }
  },
}
</script>
