<template>
  <div class="example-component">
    <el-radio
      v-model="value"
      label="option1"
    >
      选项一
    </el-radio>
    <el-radio
      v-model="value"
      label="option2"
    >
      选项二
    </el-radio>
  </div>
</template>

<script>
export default {
  type: 'radio',
  label: '单选框',
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
