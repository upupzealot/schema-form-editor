<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
  >
    <el-switch
      v-model="data[field.name]"
      :disabled="disabled"
      :active-text="field.activeText"
      :active-value="field.activeValue || true"
      :inactive-text="field.inactiveText"
      :inactive-value="field.inactiveValue || false"
    />
  </el-form-item>
</template>

<script>
import standardMixin from './standard-mixin'

export default {
  mixins: [standardMixin],
  defaultSchema: {}
};
</script>
