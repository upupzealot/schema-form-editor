<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    label="　"
    class="blank-wrap"
    style="margin-bottom: 0"
  >
    <div class="blank" />
  </el-form-item>
</template>

<style>
.blank-wrap .el-form-item__label {
  color: transparent;
  content: none;
  pointer-events: none;
}
.blank-wrap .blank {
  width: 100%;
  height: 40px;
  color: #eee;
}
</style>

<script>
import formItemMixin from '@/ui-kit/element-ui/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
