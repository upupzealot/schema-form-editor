<template>
  <el-input-number
    v-model="value"
    class="example-component"
  />
</template>

<script>
export default {
  type: 'input-number',
  label: '数字框',
  data() {
    return { value: 3 };
  }
}
</script>
