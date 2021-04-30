<template>
  <Cascader
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
    class="editor-select-item"
  />
</template>

<style>
.editor-select-item.v-readonly .el-form-item__content {
  background: linear-gradient(45deg, #efefef 25%, transparent 0, transparent 50%, #efefef 0, #efefef 75%, transparent 0);
  background-size:20px 20px;
}
.editor-select-item.v-disabled .el-form-item__content {
  background-color: #efefef;
}
.editor-select-item.v-disabled .el-form-item__content .el-select,
.editor-select-item.v-readonly .el-form-item__content .el-select {
  opacity: .6;
}
</style>

<script>
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'

import Cascader from './cascader'

export default {
  type: 'cascader',
  components: {
    Cascader,
  },
  mixins: [editorItemMixin],
}
</script>