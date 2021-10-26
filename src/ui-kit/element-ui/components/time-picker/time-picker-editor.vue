<template>
  <TimePicker
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
    class="editor-time-picker-item"
  />
</template>

<style>
.editor-time-picker-item.v-readonly .el-form-item__content {
  background: linear-gradient(45deg, #efefef 25%, transparent 0, transparent 50%, #efefef 0, #efefef 75%, transparent 0);
  background-size:20px 20px;
}
.editor-time-picker-item.v-disabled .el-form-item__content {
  background-color: #efefef;
}
.editor-time-picker-item.v-disabled .el-form-item__content .el-date-editor,
.editor-time-picker-item.v-readonly .el-form-item__content .el-date-editor {
  opacity: .6;
}
</style>

<script>
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'

import TimePicker from './time-picker'

export default {
  type: 'time-picker',
  components: {
    TimePicker,
  },
  mixins: [editorItemMixin],
}
</script>
