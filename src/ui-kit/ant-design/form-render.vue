<template>
  <a-form-model
    ref="form"
    :layout="layout"
    :labelAlign="labelAlign"
    :labelCol="{ span: labelCol }"
    :wrapperCol="{ span: 24 - labelCol }"
    :model="data"
    :rules="validRules"
    style="margin-bottom: -15px;"
  >
    <a-row :gutter="gutter">
      <a-col
        v-for="field in fieldList"
        :key="field.name"
        :span="field.span"
      >
        <Input
          v-if="field.type === 'input'"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
      </a-col>
    </a-row>
  </a-form-model>
</template>

<style>
.form-item.readonly {
  pointer-events: none;
}
</style>

<script>
import _ from 'lodash';

import Input from './components/input/input';

export default {
  name: 'FormRender',
  components: {
    Input,
  },
  props: {
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
    formConf() {
      return this.schema.formConf;
    },
    labelCol() {
      return this.labelPosition === 'right'
        || this.labelPosition === 'left'
        ? this.formConf.labelCol || 3
        : 0;
    },
    gutter() {
      return this.formConf.gutter || 20;
    },
    labelPosition() {
      return this.formConf.labelPosition || 'right';
    },
    layout() {
      console.log(this.labelPosition)
      return this.labelPosition === 'right'
        || this.labelPosition === 'left'
        ? 'horizontal' : 'vertical';
    },
    labelAlign() {
      return this.layout === 'horizontal' ? this.labelPosition : 'right';
    },
    fieldList() {
      return this.schema.fieldList;
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
                  const pass = regExp.test(value);
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
        fields.forEach(field => {
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
      return new Promise(async (resolve, reject) => {
        let valiResult = true;
        
        this.$refs['form'].validate(isValid => {
          valiResult = valiResult && isValid;

          let subformItems = this.$refs['subformItems'] || [];
          if(!_.isArray(subformItems)) {
            subformItems = [subformItems];
          }

          Promise.all(subformItems.map(subform => {
            return new Promise(reso => {
              (async ()=> {
                await subform.validate(isVali => reso)
              })();
            })
          })).then(valids => {
            valids.forEach(valid => {
              valiResult = valiResult && valid;
            })
          });
          resolve(valiResult);
        });
      });
    }
  }
}
</script>
