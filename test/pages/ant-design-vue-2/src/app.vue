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
              >
                <template
                  v-for="(slotName, i) in slotNames"
                  :key="i"
                  v-slot:[slotName]="{ schema, field, data }">
                  <component
                    :is="slotComponent"
                    v-bind="{ schema, field, data }"
                  />
                </template>
              </FormRender>
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
