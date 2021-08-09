<template>
  <a-input
    v-model="value"
    placeholder="文件选择"
    class="example-component"
  />
</template>

<script>
export default {
  type: 'input-file',
  label: '文件选择',
  data() {
    return { value: 'example.png' };
  }
}
</script>
