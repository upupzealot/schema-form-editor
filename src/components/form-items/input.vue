<template>
  <el-form-item
    v-if="enabled"
    :label="field.label"
    :prop="field.name"
    class="form-item"
  >
    <el-input
      v-model="form[field.name]"
      :type="field.mode"
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
  computed: {
    enabled: {
      get() {
        return this.field.enabled !== false;
      },
      set(val) {
        this.$set(this.field, 'enabled', val);
      }
    },
    effect() {
      let effectFunc = new Function(...this.effectParams.map(p => p.key), this.field.effect);
      effectFunc = effectFunc.bind(this);
      return effectFunc;
    },
    effectParams() {
      return [{
        key: 'form',
        value: this.form,
      }, {
        key: 'field',
        value: this.form,
      }, {
        key: 'watch',
        value: (path, func, opt) => {
          this.$watch(`form.${path}`, func, { immediate: true, ...opt });
        }
      }, {
        key: 'set',
        value: (key, val) => {
          this[key] = val;
        },
      }]
    }
  },
  created() {
    this.effect(...this.effectParams.map(p => p.value));
  },
  defaultSchema: {},
};
</script>
