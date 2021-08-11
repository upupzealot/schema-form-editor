<template>
  <div>Slot: {{ field.name }}</div>
</template>

<script>
export default {
  props: {
    schema: {
      type: Object,
      default() {
        return {};
      }
    },
    field: {
      type: Object,
      default() {
        return {};
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>
