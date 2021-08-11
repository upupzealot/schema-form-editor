<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <h1 style="color: #ccc;">
          Ant Design Vue 1.x & Vue 2.x
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
import appMixin from '../../app-mixin'

export default {
  name: 'App',
  mixins: [appMixin],
  components: {
    FormRender,
  },
}
</script>
