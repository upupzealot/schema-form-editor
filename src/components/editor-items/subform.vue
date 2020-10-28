<template>
  <div
    v-if="activated"
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
      :init-schema="field"
      :data="data[field.name]"
      :sup-nodes="supNodes"
    />
  </div>
</template>

<style scoped>
.subform-wrap {
  width: 100%;
}
</style>

<script>
import standardMixin from '../form-items/standard-mixin'

// 全局引入，避免循环引用
// import FormEditor from '@/components/form-editor'

export default {
  name: 'Subform',
  components: {
    // FormEditor,
  },
  mixins: [standardMixin],
  created() {
    if(!this.data[this.field.name]) {
      this.$set(this.data, this.field.name, {});
    }
  }
}
</script>
