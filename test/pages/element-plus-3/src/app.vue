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
import appMixin from '../../app-mixin'

export default {
  name: 'App',
  mixins: [appMixin],
  components: {
    FormRender,
  },
}
</script>
