<template>
  <el-form-item
    v-if="activated"
    :label="field.label"
    class="form-item"
  >
    <el-switch
      v-model="data[field.name]"
      :active-text="field.activeText"
      :inactive-text="field.inactiveText"
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
