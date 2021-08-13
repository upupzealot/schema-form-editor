<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{ marginBottom: colMarginY }"
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
      @change="fieldSubmit"
      @clear="fieldSubmit"
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
import formItemMixin from '../../common/form-item/mixin'
import optionListMixin from '../../../common/form-item/option-list-mixin.js'

export default {
  mixins: [formItemMixin, optionListMixin],
};
</script>
