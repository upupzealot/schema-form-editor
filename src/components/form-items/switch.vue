<template>
  <el-form-item
    :label="field.label"
    class="form-item"
  >
    <el-switch
      v-model="form[field.name]"
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
