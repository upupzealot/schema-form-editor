<template>
  <Input
    :form-conf="formConf"
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

import Input from './input'

export default {
  type: 'input',
  components: {
    Input,
  },
  mixins: [editorItemMixin],
}
</script>
