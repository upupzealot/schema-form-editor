<template>
  <el-form-item
    label="可清空"
    prop="clearable"
  >
    <el-switch
      v-model="clearable"
    />
  </el-form-item>
</template>

<script>
export default {
  computed: {
    field() {
      return this.$store.state.activeField;
    },
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
