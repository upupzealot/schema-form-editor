<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    label="　"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
    class="blank-wrap"
    :style="{
      marginBottom: colMarginY,
      display: 'flex',
      flexDirection: isLabelTop ? 'column' : '',
    }"
  >
    <div class="blank" />
  </component>
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
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
