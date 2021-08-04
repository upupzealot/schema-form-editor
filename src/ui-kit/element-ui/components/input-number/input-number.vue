<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{
      'input-number': true,
      'form-item': true,
      'readonly': readonly
    }"
    :style="{ marginBottom: colMarginY }"
    :sfr-f="field.name"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-input-number
      v-model="data[field.name]"
      :min="field.min"
      :max="field.max"
      :step="field.step"
      :step-strictly="field.stepOnly"
      :precision="field.precision"
      :controls="field.hasControl"
      :controls-position="field.controlPosition"
      :placeholder="field.placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="{
        'left-align': field.textAlign === 'left',
        'center-align': !field.textAlign,
        'right-align': field.textAlign === 'right'
      }"
      style="width: 100%;"
    />
  </el-form-item>
</template>

<style>
.input-number .el-input-number.left-align .el-input input {
  text-align: left;
}
.input-number .el-input-number.center-align .el-input input {
  text-align: center;
}
.input-number .el-input-number.right-align .el-input input {
  text-align: right;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
