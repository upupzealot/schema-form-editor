<template>
  <el-form-item
    v-if="enabled"
    :label="field.label"
    class="form-item"
  >
    <el-checkbox-group v-model="data[field.name]">
      <el-checkbox
        v-for="option in field.options"
        :key="option.value"
        :label="option.value"
      >
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
import standardMixin from './standard-mixin'

export default {
  mixins: [standardMixin],
  created() {
    this.$set(this.data, this.field.name, []);
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
