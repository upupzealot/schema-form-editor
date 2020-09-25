<template>
  <el-form-item
    :label="field.label"
    :required="field.required"
    class="form-item"
  >
    <el-date-picker
      :key="calendarId"
      v-model="form[field.name]"
      style="width: 100%;"
      :type="field.mode"
      value-format="timestamp"
    />
  </el-form-item>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {}
      },
    },
    field: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      calendarId: this.$id(),
    }
  },
  watch: {
    'field.mode': {
      handler() {
        this.$set(this.form, this.field.name, undefined);
        this.calendarId = this.$id();
        this.$forceUpdate();
      }
    }
  },
  defaultSchema: {},
};
</script>
