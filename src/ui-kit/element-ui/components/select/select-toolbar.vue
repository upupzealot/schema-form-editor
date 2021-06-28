<template>
  <el-select
    v-model="value"
    placeholder="下拉选项"
    class="example-component"
  >
    <el-option
      label="选项一"
      value="option1"
    />
    <el-option
      label="选项二"
      value="option2"
    />
  </el-select>
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
