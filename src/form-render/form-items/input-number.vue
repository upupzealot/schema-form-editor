<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
  >
    <template slot="label">
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
    />
  </el-form-item>
</template>

<script>
import standardMixin from './standard-mixin'

export default {
  mixins: [standardMixin],
};
</script>
