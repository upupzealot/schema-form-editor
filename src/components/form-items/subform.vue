<template>
  <div
    v-if="enabled"
    class="subform-wrap"
  >
    <el-tag
      size="mini"
      style="margin-bottom: 10px;"
    >
      子表单 {{ field.name }}
    </el-tag>
    <FormEditor
      :form-key="field.name"
      :data="data[field.name]"
    />
  </div>
</template>

<style scoped>
.subform-wrap {
  width: 100%;
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
  created() {
    this.$set(this.data, this.field.name, {});
  }
}
</script>
