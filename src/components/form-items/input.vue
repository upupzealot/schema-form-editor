<template>
  <el-form-item
    :label="field.label"
    :prop="field.name"
    class="form-item"
  >
    <el-input
      v-model="form[field.name]"
      :type="field.mode"
    />
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
