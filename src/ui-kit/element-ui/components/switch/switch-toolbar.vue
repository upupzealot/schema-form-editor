<template>
  <el-switch
    v-model="value"
    active-text="开"
    inactive-text="关"
    class="example-component"
  />
</template>

<script>
export default {
  type: 'switch',
  label: '开关',
  data() {
    return { value: true };
  }
}
</script>
