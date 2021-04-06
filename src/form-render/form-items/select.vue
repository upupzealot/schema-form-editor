<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-select
      v-model="data[field.name]"
      :disabled="disabled"
      :placeholder="field.placeholder"
      :clearable="field.clearable"
      :multiple="field.multiple"
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

<style>
.form-item.readonly .el-input__suffix-inner {
  pointer-events: none;
}
</style>

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
