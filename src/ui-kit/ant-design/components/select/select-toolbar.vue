<template>
  <a-select
    v-model="value"
    placeholder="下拉选项"
    class="example-component"
  >
    <a-select-option
      label="选项一"
      value="option1"
    />
    <a-select-option
      label="选项二"
      value="option2"
    />
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
    return { value: '' };
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
