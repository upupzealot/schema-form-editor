<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    class="form-item"
  >
    <el-input
      v-model="data[field.name]"
      :type="field.mode"
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
