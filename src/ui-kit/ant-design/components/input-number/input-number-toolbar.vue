<template>
  <a-input-number
    v-model="value"
    class="example-component"
    style="width: 100%;"
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
