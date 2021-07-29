<template>
  <el-form-item
    label="占位符"
    prop="placeholder"
  >
    <el-input
      v-model="placeholder"
    />
  </el-form-item>
</template>

<script>
export default {
  computed: {
    field() {
      return this.$store.state.activeField;
    },
    placeholder: {
      get() {
        return this.field.placeholder || '';
      },
      set(val) {
        this.$set(this.field, 'placeholder', val || undefined);
      }
    }
  }
}
</script>
