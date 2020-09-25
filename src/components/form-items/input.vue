<template>
  <el-form-item
    :label="field.label"
    :required="field.required"
    class="form-item"
  >
    <el-input v-model="form[field.name]" />
  </el-form-item>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {}
      },
    },
    field: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  defaultSchema: {},
};
</script>
