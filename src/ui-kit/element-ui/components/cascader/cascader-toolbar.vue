<template>
  <el-cascader
    v-model="value"
    :options="options"
    placeholder="级联选择"
    class="example-component"
  />
</template>

<style>
.item-bar .example-component .el-input__suffix-inner {
  pointer-events: none;
}
</style>

<script>
export default {
  type: 'cascader',
  label: '级联选择',
  data() {
    return {
      value: ['a', 'b', 'c'],
      options: [{
        value: 'a',
        label: 'A',
        children: [{
          value: 'b',
          label: 'B',
          children: [{
            value: 'c',
            label: 'C',
          }]
        }]
      }]
    };
  },
}
</script>
