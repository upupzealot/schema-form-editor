<template>
  <div
    v-if="enabled"
    class="subform-wrap"
  >
    <el-tag
      size="mini"
      style="margin-left: -10px; margin-bottom: 10px;"
    >
      子表单 {{ field.name }}
    </el-tag>
    <FormEditor :form-key="field.name" />
  </div>
</template>

<style scoped>
.subform-wrap {
  width: 100%;
  border: 1px dashed #eee;
  padding: 0 10px 10px 10px;
}
</style>

<script>
import standardMixin from './standard-mixin'

// 全局引入，避免循环引用
// import FormEditor from '@/components/form-editor'

export default {
  name: 'Subform',
  components: {
    // FormEditor,
  },
  mixins: [standardMixin],
}
</script>
