<template>
  <el-form-item
    :label="field.label"
    :required="field.required"
    class="form-item"
  >
    <el-radio
      v-for="option in field.options"
      :key="option.value"
      v-model="form[field.name]"
      :label="option.value"
    >
      <!-- 这里的 label 是值 -->
      {{ option.label }}
    </el-radio>
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
  defaultSchema: {
    options: [{
      label: '选项一',
      value: 'option1',
    }, {
      label: '选项二',
      value: 'option2',
    }],
  }
};
</script>
