const mixin = {
  props: {
    inline: {
      type: Boolean,
      default() {
        return false;
      }
    },
    scenario: {
      type: String,
      default() {
        return 'edit'; // create || edit || preview
      }
    },
    supNodes: {
      type: Array,
      default() {
        return null;
      }
    },
    schema: {
      type: Object,
      default() {
        return {};
      },
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    config: {
      type: Object,
      default() {
        return {};
      },
    }
  },
  computed: {
    supNodeList() {
      if(this.supNodes) {
        return [...this.supNodes, this];
      } else {
        return [this];
      }
    },
    marginX() {
      return this.formConf.marginX || 20;
    },
    supNodeList() {
      if(this.supNodes) {
        return [...this.supNodes, this];
      } else {
        return [this];
      }
    },
    marginX() {
      return this.formConf.marginX || 20;
    },
    formConf() {
      return this.schema.formConf || {};
    },
    labelWidth() {
      return this.formConf.labelWidth || '80px';
    },
    labelPosition() {
      return this.formConf.labelPosition || 'right';
    },
    fieldList() {
      return this.schema.fieldList;
    },
    slotNames() {
      const $root = this.supNodeList[0];
      let slotNames = Object.keys($root.$slots || {});
      slotNames = slotNames.concat(Object.keys($root.$scopedSlots || {}));
      return _.uniq(slotNames);
    },
    validFuncs() {
      return this.schema.validFuncs;
    },
    validRules() {
      const fieldMap =  _.keyBy(this.fieldList, 'name');
      const validFuncMap = _.keyBy(this.validFuncs, 'key');
      return _(this.schema.validRules)
        .pickBy((rules, key) => fieldMap[key] && rules && rules.length)
        .mapValues((rules, key) => {
          const field = fieldMap[key];

          const className = _.upperFirst(_.camelCase(field.type)); // 未考虑 SSwitch
          const fieldComponent = this.$options.components[className];
          let componentValidatorMap = {};
          if(fieldComponent && fieldComponent.validators) {
            componentValidatorMap = _.keyBy(fieldComponent.validators, 'key');
          }

          return rules.map(rule => {
            if(rule.type === 'required') {
              return {
                required: true,
                message: rule.note || `请输入${field.label}`,
                trigger: rule.trigger || 'blur',
              };
            } else if (rule.type === 'regexp') {
              const regExp = new RegExp(rule.regexp);

              return {
                validator(r, value, callback) {
                  // value 为空的时候正则校验器不起作用
                  const pass = !value || regExp.test(value);
                  if(pass) {
                    callback();
                  } else {
                    callback(new Error(rule.note));
                  }
                },
                trigger: rule.trigger || 'blur',
              }
            } else if(rule.type === 'func') {
              let validFunc = null;
              if (rule.isPreset !== false) {
                if (_.startsWith(rule.preset, '[component]')) {
                  const key = rule.preset.replace('[component]', '');
                  const validator = componentValidatorMap[key];
                  if(validator) {
                    validFunc = validator.func;
                  } else {
                    // console.warn(`validator not found: ${key} in component ${className}`)
                    return null;
                  }
                } else {
                  const funcStr = validFuncMap[rule.preset].func;
                  validFunc = new Function('rule', 'value', 'callback', funcStr);
                }
              } else {
                const funcStr = rule.func;
                validFunc = new Function('rule', 'value', 'callback', funcStr);
              }

              validFunc = validFunc.bind(this);

              return {
                validator: validFunc,
                trigger: rule.trigger || 'blur',
              }
            }
          })
        })
        .pickBy()
        .value();
    }
  },
  watch: {
    fieldList: {
      handler(fields) {
        fields && fields.forEach(field => {
          if(field.type === 'subform' && !this.data[field.name]) {
            this.$set(this.data, field.name, {});
          }
          if(field.type === 'item-list' && !this.data[field.name]) {
            this.$set(this.data, field.name, []);
          }
        })
      },
      immediate: true,
    }
  },
  methods: {
    async validate() {
      return new Promise(resolve => {
        let valiResult = true;
        
        this.$refs['form'].validate(async isValid => {
          valiResult = valiResult && isValid;

          let subformItems = this.$refs['subformItems'] || [];
          if(!_.isArray(subformItems)) {
            subformItems = [subformItems];
          }

          const valids = await Promise.all(subformItems.map(subform => {
            return subform.validate();
          }));
          valids.forEach(valid => {
            valiResult = valiResult && valid;
          })
          return resolve(valiResult);
        });
      });
    }
  }
}

import isVue2 from 'vue';
if(!isVue2) {
  mixin.methods.$set = function(obj, key, val) {
    obj[key] = val;
  };
  mixin.methods.$delete = function(obj, key, val) {
    delete obj[key];
  };
}

export default mixin;
