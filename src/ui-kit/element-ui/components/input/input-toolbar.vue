<template>
  <el-input
    v-model="value"
    placeholder="请输入"
    class="example-component"
  />
</template>

<script>
export default {
  type: 'input',
  label: '文本框',
  data() {
    return { value: '' };
  }
}
</script>
