<template>
  <el-form-item
    label="可清空"
    prop="clearable"
    active-text="是"
    inactive-text="否"
  >
    <el-switch
      v-model="clearable"
    />
  </el-form-item>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  computed: {
    clearable: {
      get() {
        return !!this.field.clearable;
      },
      set(val) {
        this.$set(this.field, 'clearable', val || undefined);
      }
    }
  }
}
</script>
