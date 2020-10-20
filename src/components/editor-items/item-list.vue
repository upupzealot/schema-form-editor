<template>
  <div
    v-if="enabled"
    class="subform-wrap"
  >
    <el-tag
      size="mini"
      style="margin-bottom: 10px;"
    >
      列表 {{ field.name }}
    </el-tag>
    <el-button style="display: block;">
      新增列表项
    </el-button>
    <FormEditor
      :form-key="field.name"
      :data="{}"
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
  name: 'ItemList',
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
