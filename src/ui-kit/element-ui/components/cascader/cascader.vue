<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    style="margin-bottom: 0"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-cascader
      v-model="selected"
      :options="optionList"
      :disabled="disabled"
      :placeholder="field.placeholder"
      :clearable="field.clearable"
      style="width: 100%"
    />
  </el-form-item>
</template>

<style>
.form-item.readonly .el-input__suffix-inner {
  pointer-events: none;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'
import cascaderOptionListMixin from '../../../common/form-item/cascader-option-list-mixin'

export default {
  mixins: [formItemMixin, cascaderOptionListMixin],
};
</script>
