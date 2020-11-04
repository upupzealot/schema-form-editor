<template>
  <DatePicker
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
    class="editor-date-picker-item"
  />
</template>

<style>
.editor-date-picker-item.v-readonly .el-form-item__content {
  background: linear-gradient(45deg, #efefef 25%, transparent 0, transparent 50%, #efefef 0, #efefef 75%, transparent 0);
  background-size:20px 20px;
}
.editor-date-picker-item.v-disabled .el-form-item__content {
  background-color: #efefef;
}
.editor-date-picker-item.v-disabled .el-form-item__content .el-date-editor,
.editor-date-picker-item.v-readonly .el-form-item__content .el-date-editor {
  opacity: .6;
}
</style>

<script>
import standardMixin from './standard-mixin'

import DatePicker from '../form-items/date-picker'

export default {
  components: {
    DatePicker,
  },
  mixins: [standardMixin],
}
</script>
