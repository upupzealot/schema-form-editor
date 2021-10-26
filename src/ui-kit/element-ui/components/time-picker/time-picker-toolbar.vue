<template>
  <el-time-picker
    v-model="value"
    style="width:100%"
    placeholder="选择时间"
    class="example-component"
  />
</template>

<script>
export default {
  type: 'time-picker',
  label: '时间选择',
  data() {
    return { value: null };
  }
}
</script>
