<template>
  <InputFile
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
    class="editor-input-item"
  />
</template>

<style>
.editor-input-item.v-disabled .el-form-item__content .el-input,
.editor-input-item.v-readonly .el-form-item__content .el-input {
  opacity: .6;
}
</style>

<script>
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'

import InputFile from './input-file'

export default {
  type: 'input-file',
  components: {
    InputFile,
  },
  mixins: [editorItemMixin],
}
</script>
