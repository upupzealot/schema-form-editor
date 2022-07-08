<template>
  <div
    class="subform-wrap"
    :class="statusClasses"
  >
    <el-tag
      :size="tagSize"
      style="margin-bottom: 10px;"
    >
      子表单 {{ field.name }}
    </el-tag>
    <FormEditor
      :form-key="field.id"
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
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'
import isVue2 from '../../../common/util-is-vue2';

// 全局引入，避免循环引用
// import FormEditor from '@/ui-kit/form-editor'

export default {
  type: 'subform',
  components: {
    // FormEditor,
  },
  mixins: [editorItemMixin],
  data() {
    return {
      tagSize: isVue2 ? 'mini' : 'small',
    };
  },
  created() {
    if(!this.data[this.field.name]) {
      this.$set(this.data, this.field.name, {});
    }
  }
}
</script>
