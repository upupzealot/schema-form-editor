<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
  >
    <el-date-picker
      :key="calendarId"
      v-model="data[field.name]"
      :type="field.mode"
      :disabled="disabled"
      :placeholder="field.placeholder"
      value-format="timestamp"
      style="width: 100%;"
    />
  </el-form-item>
</template>

<script>
import standardMixin from './standard-mixin'

export default {
  mixins: [standardMixin],
  data() {
    return {
      calendarId: this.$id(),
    }
  },
  watch: {
    'field.mode': {
      handler() {
        this.$set(this.data, this.field.name, undefined);
        this.calendarId = this.$id();
        this.$forceUpdate();
      }
    }
  },
  defaultSchema: {},
};
</script>
