<template>
  <div
    class="subform-wrap"
    :class="statusClasses"
  >
    <el-tag
      size="mini"
      style="margin-bottom: 10px;"
    >
      容器 {{ field.name }}
    </el-tag>
    <FormEditor
      :form-key="field.id"
      :init-schema="field"
      :data="data"
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

// 全局引入，避免循环引用
// import FormEditor from '@/ui-kit/form-editor'

export default {
  type: 'wrapper',
  components: {
    // FormEditor,
  },
  mixins: [editorItemMixin],
}
</script>
