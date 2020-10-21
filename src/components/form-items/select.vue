<template>
  <el-form-item
    v-if="enabled"
    :label="field.label"
    class="form-item"
  >
    <el-select
      v-model="data[field.name]"
      placeholder="下拉选项"
      style="width: 100%"
    >
      <el-option
        v-for="option in optionList"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </el-form-item>
</template>

<script>
import standardMixin from './standard-mixin'
import optionListMixin from './option-list-mixin'

export default {
  mixins: [standardMixin, optionListMixin],
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
