<template>
  <el-form-item
    :label="field.label"
    class="form-item"
  >
    <el-switch
      v-model="form[field.name]"
      :active-text="field.activeText"
      :inactive-text="field.inactiveText"
    />
  </el-form-item>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
    field: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  defaultSchema: {}
};
</script>
