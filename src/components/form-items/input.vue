<template>
  <el-form-item
    v-if="activated"
    :label="field.label"
    :prop="field.name"
    class="form-item"
  >
    <el-input
      v-model="data[field.name]"
      :type="field.mode"
    />
  </el-form-item>
</template>

<script>
import standardMixin from './standard-mixin'

export default {
  mixins: [standardMixin],
};
</script>
