<template>
  <a-switch
    v-model="value"
    checked-children="开"
    un-checked-children="关"
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
