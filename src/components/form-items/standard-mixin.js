export default {
  props: {
    supNodes: {
      type: Array,
      default() {
        return null;
      }
    },
    data: {
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
    vStatus: {
      type: Object,
      default() {
        return null
      },
    }
  },
  data() {
    const status = this.vStatus ? {} : {
      activated: this.field.activated !== false,
      visible: this.field.visible !== false,
      readonly: !!this.field.readonly,
      disabled: !!this.field.disabled,
    }

    return {
      status,
    }
  },
  computed: {
    activated: {
      get() {
        return this.status.activated !== false;
      },
      set(val) {
        this.$set(this.vStatus || this.status, 'activated', val);
      }
    },
    visible: {
      get() {
        return this.status.visible !== false;
      },
      set(val) {
        this.$set(this.vStatus || this.status, 'visible', val);
      }
    },
    readonly: {
      get() {
        return !!this.status.readonly;
      },
      set(val) {
        this.$set(this.vStatus || this.status, 'readonly', val);
      }
    },
    disabled: {
      get() {
        return !!this.status.disabled;
      },
      set(val) {
        this.$set(this.vStatus || this.status, 'disabled', val);
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
        key: 'data',
        value: this.data,
      }, {
        key: 'field',
        value: this.field,
      }, {
        key: 'watch',
        value: (path, func, opt) => {
          let depth = 0;
          let prop = path.replace(/..\//g, '');
          if(path.startsWith('../')) {
            const matches = path.match(/..\//g);
            if(matches) {
              depth = matches.length;
            }
          }
          
          let $vm = this;
          if(depth && depth < this.supNodes.length) {
            $vm = this.supNodes[this.supNodes.length - 1 - depth];
          }

          $vm.$watch(`data.${prop}`, func, { immediate: true, ...opt });
        }
      }, {
        key: 'set',
        value: (key, val) => {
          this.$set(this, key, val);
        },
      }]
    }
  },
  watch: {
    'field.name': {
      handler(key, oldKey) {
        if(oldKey) {
          this.$set(this.data, key, this.data[oldKey]);
          this.$set(this.data, oldKey, undefined);
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
