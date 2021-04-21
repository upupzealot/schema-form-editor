<template>
  <ChinaRegion
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
    class="editor-china-region"
  />
</template>

<style>
.editor-china-region.v-readonly .el-form-item__content {
  background: linear-gradient(45deg, #efefef 25%, transparent 0, transparent 50%, #efefef 0, #efefef 75%, transparent 0);
  background-size:20px 20px;
}
.editor-china-region.v-disabled .el-form-item__content {
  background-color: #efefef;
}
.editor-china-region.v-disabled .el-form-item__content .el-select,
.editor-china-region.v-readonly .el-form-item__content .el-select {
  opacity: .6;
}
</style>

<script>
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'

import ChinaRegion from './china-region'

export default {
  type: 'china-region',
  components: {
    ChinaRegion,
  },
  mixins: [editorItemMixin],
}
</script>