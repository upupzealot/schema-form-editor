<template>
  <div class="unsupported-item">
    &lt; 未支持的组件 {{field.type}} &gt;
  </div>
</template>

<style scoped>
.unsupported-item {
  width: 100%;
  color: #ccc;
  text-align: center;
}
</style>

<script>
export default {
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>
