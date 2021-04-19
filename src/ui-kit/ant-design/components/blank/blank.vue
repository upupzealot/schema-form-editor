<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    label="　"
    :labelCol="labelCol"
    :wrapperCol="wrapperCol"
    :colon="false"
    class="blank-wrap"
    style="margin-bottom: 0; display: flex;"
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
