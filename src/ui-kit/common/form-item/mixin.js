export default {
  props: {
    scenario: {
      type: String,
      default() {
        return 'edit'; // create || edit || preview
      }
    },
    formConf: {
      type: Object,
      default() {
        return {}
      },
    },
    supNodes: {
      type: Array,
      default() {
        return null;
      }
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
    },
    data: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      status: {},
    }
  },
  computed: {
    config() {
      return this.supNodes[0].mixedConfig || {};
    },
    parent() {
      if(!this.supNodes || !this.supNodes.length) {
        return null;
      }
      return this.supNodes[this.supNodes.length - 1];
    },
    parentStatus() {
      return this.parent
        && this.parent.$parent
        && this.parent.$parent.status;
    },
    activated: {
      get() {
        if(this.vStatus) {
          return true;
        }
        if(_.isNil(this.status.activated)) {
          // undefined，未在联动中指定
          return this.field.activated !== false;
        } else {
          return this.status.activated;
        }
      },
      set(val) {
        this.$set(this.vStatus || this.status, 'activated', val);
      }
    },
    visible: {
      get() {
        if(this.vStatus) {
          return true;
        }
        if(_.isNil(this.status.visible)) {
          // undefined，未在联动中指定
          return this.field.visible !== false;
        } else {
          return this.status.visible;
        }
      },
      set(val) {
        this.$set(this.vStatus || this.status, 'visible', val);
      }
    },
    readonly: {
      get() {
        if(this.vStatus) {
          return false;
        }
        if(_.isNil(this.status.readonly)) {
          // undefined，未在联动中指定
          return !!(this.parentStatus && this.parentStatus.readonly) ||
            !!this.field.readonly;
        } else {
          return !!(this.parentStatus && this.parentStatus.readonly) ||
            this.status.readonly;
        }
      },
      set(val) {
        this.$set(this.vStatus || this.status, 'readonly', val);
      }
    },
    disabled: {
      get() {
        if(this.vStatus) {
          return false;
        }
        if(_.isNil(this.status.disabled)) {
          // undefined，未在联动中指定
          return !!(this.parentStatus && this.parentStatus.disabled) ||
            !!this.field.disabled;
        } else {
          return !!(this.parentStatus && this.parentStatus.disabled) ||
            this.status.disabled;
        }
      },
      set(val) {
        this.$set(this.vStatus || this.status, 'disabled', val);
      }
    },
    marginY() {
      return this.formConf.marginY || 15;
    },
    colMarginY() {
      if(this.vStatus || this.activated === false || this.visible === false) {
        return '0';
      } else if(this.field.type === 'wrapper' || this.field.type === 'subform' ) {
        return `${this.marginY - (this.field.formConf.marginY || 15)}px`;
      } else {
        return `${this.marginY}px`;
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
        key: 'scenario',
        value: this.scenario,
      }, {
        key: 'config',
        value: this.config,
      }, {
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
          if(depth && depth <= this.supNodes.length) {
            if(this.field.type === 'subform') {
              $vm = this.supNodes[this.supNodes.length - depth];
            } else if (depth < this.supNodes.length) {
              $vm = this.supNodes[this.supNodes.length - 1 - depth];
            }
            // $vm = this.supNodes[this.supNodes.length - 1 - depth];
          }
          if(prop.startsWith('this.')) {
            prop = prop.replace('this.', '');
            this.$watch(prop, func, Object.assign({ immediate: true }, opt));
          } else {
            $vm.$watch(`data.${prop}`, func, Object.assign({ immediate: true }, opt));
          }
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
