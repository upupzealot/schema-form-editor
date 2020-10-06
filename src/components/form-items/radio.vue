<template>
  <el-form-item
    :label="field.label"
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
import standardMixin from './standard-mixin'

export default {
  mixins: [standardMixin],
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
