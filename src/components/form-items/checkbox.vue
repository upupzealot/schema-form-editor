<template>
  <el-form-item
    :label="field.label"
    :required="field.required"
    class="form-item"
  >
    <el-checkbox-group v-model="form[field.name]">
      <el-checkbox
        v-for="option in field.options"
        :key="option.value"
        :label="option.value"
      >
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
    field: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    'field.name': {
      handler(key, oldKey) {
        if(oldKey) {
          this.$set(this.form, key, this.form[oldKey]);
          this.$set(this.form, oldKey, undefined);
        }
      }
    }
  },
  created() {
    this.$set(this.form, this.field.name, []);
  },
  defaultSchema: {
    options: [{
      label: '选项一',
      value: 'option1',
    }, {
      label: '选项二',
      value: 'option2',
    }],
  }
};
</script>
