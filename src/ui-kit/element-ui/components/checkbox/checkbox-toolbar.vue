<template>
  <el-checkbox-group v-model="value">
    <el-checkbox
      label="option1"
      class="example-component"
    >
      选项一
    </el-checkbox>
    <el-checkbox
      label="option2"
      class="example-component"
    >
      选项二
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  type: 'checkbox',
  label: '复选框',
  data() {
    return { value: ['option1', 'option2'] };
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
