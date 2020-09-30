<template>
  <el-form-item
    :label="field.label"
    :required="field.required"
    class="form-item"
  >
    <el-select
      v-model="form[field.name]"
      placeholder="下拉选项"
      style="width: 100%"
    >
      <el-option
        v-for="option in field.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
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
