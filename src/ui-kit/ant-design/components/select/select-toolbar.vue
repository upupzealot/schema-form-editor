<template>
  <a-select
    v-model="value"
    placeholder="请选择"
    class="example-component"
  >
    <a-select-option
      value="option1"
    >选项一</a-select-option>
    <a-select-option
      value="option2"
    >选项二</a-select-option>
  </a-select>
</template>

<style>
.item-bar .example-component .el-input__suffix-inner {
  pointer-events: none;
}
</style>

<script>
export default {
  type: 'select',
  label: '下拉选项',
  data() {
    return { value: 'option1' };
  },
  defaultSchema: {
    options: [{
      label: '选项一',
      value: 'option1',
    }, {
      label: '选项二',
      value: 'option2',
    }],
  }
}
</script>
