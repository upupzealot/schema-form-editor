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
        'right-align': field.textAlign === 'right'
      }"
      style="width: 100%;"
    />
  </el-form-item>
</template>

<style scoped>
>>> .el-input-number.left-align .el-input input {
  text-align: left;
}
>>> .el-input-number.right-align .el-input input {
  text-align: right;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
