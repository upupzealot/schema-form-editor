<template>
  <el-form-item
    label="组件模式"
    class="schema-form"
  >
    <el-select v-model="mode">
      <el-option
        label="单行文本"
        value="text"
      />
      <el-option
        label="多行文本"
        value="textarea"
      />
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    mode: {
      get() {
        return this.field.mode || 'text';
      },
      set(mode) {
        this.$set(this.field, 'mode', mode === 'textarea' ? 'textarea' : undefined);
      }
    }
  },
};
</script>
