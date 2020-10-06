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
      if(!this.field.effect) {
        return null;
      }

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
    if(this.field.effect) {
      this.effect(...this.effectParams.map(p => p.value));
    }
  },
  defaultSchema: {},
};
