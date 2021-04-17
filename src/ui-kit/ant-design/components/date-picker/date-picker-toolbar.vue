<template>
  <a-date-picker
    v-model="value"
    type="date"
    style="width:100%"
    placeholder="选择日期"
    class="example-component"
  />
</template>

<script>
export default {
  type: 'date-picker',
  label: '日期选择',
  data() {
    return { value: null };
  }
}
</script>
