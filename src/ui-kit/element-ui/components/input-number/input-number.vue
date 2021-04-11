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
      style="width: 100%;"
    />
  </el-form-item>
</template>

<script>
import formItemMixin from '@/framework/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
