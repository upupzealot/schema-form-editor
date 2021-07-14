<template>
  <component
    :is="formIs"
    ref="form"
    :layout="layout"
    :label-align="labelAlign"
    :model="data"
    :rules="validRules"
  >
    <component
      :is="inline ? 'span' : 'a-row'"
      :gutter="marginX"
    >
      <component
        :is="inline ? 'span' : 'a-col'"
        v-for="field in fieldList"
        :key="field.name"
        :span="field.span || 24"
        :style="{ marginBottom: colMarginY(field) }"
      >
        <Input
          v-if="field.type === 'input'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <InputNumber
          v-if="field.type === 'input-number'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <InputIp
          v-if="field.type === 'input-ip'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Select
          v-if="field.type === 'select'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Radio
          v-if="field.type === 'radio'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Checkbox
          v-if="field.type === 'checkbox'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <SSwitch
          v-if="field.type === 'switch'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <DatePicker
          v-if="field.type === 'date-picker'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Blank
          v-if="field.type === 'blank'"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Wrapper
          v-if="field.type === 'wrapper'"
          ref="subformItems"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :schema="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Subform
          v-if="field.type === 'subform'"
          ref="subformItems"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :schema="field"
          :data="data[field.name]"
          :sup-nodes="supNodeList"
        />
        <ItemList
          v-if="field.type === 'item-list'"
          ref="subformItems"
          :scenario="scenario"
          :form-conf="formConf"
          :field="field"
          :schema="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
      </component>
    </component>
  </component>
</template>

<style>
.form-item.readonly {
  pointer-events: none;
}
</style>

<script>
import _ from 'lodash';

import Input from './components/input/input';
import InputNumber from './components/input-number/input-number';
import InputIp from './components/input-ip/input-ip';
import Select from './components/select/select';
import Radio from './components/radio/radio';
import Checkbox from './components/checkbox/checkbox';
import SSwitch from './components/switch/switch';
import DatePicker from './components/date-picker/date-picker';

import Blank from './components/blank/blank';
import Wrapper from './components/wrapper/wrapper';
import Subform from './components/subform/subform';
// import ItemList from './components/item-list/item-list';
import isVue2 from 'vue';
const IL = isVue2 ? require('./components/item-list/item-list.vue') : require('./components/item-list/item-list3.vue');
const ItemList = IL.default;

export default {
  name: 'FormRender',
  components: {
    Input,
    InputNumber,
    InputIp,
    Select,
    Radio,
    Checkbox,
    SSwitch,
    DatePicker,
    Blank,
    Wrapper,
    Subform,
    ItemList,
  },
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
    formIs() {
      return isVue2 ? 'a-form-model' : 'a-form';
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
    marginY() {
      return this.formConf.marginY || 15;
    },
    formConf() {
      return this.schema.formConf;
    },
    labelWidth() {
      return this.formConf.labelWidth || '80px';
    },
    labelPosition() {
      return this.formConf.labelPosition || 'right';
    },
    layout() {
      return this.inline ? 'inline' :
      (this.labelPosition === 'right'
        || this.labelPosition === 'left'
        ? 'horizontal' : 'vertical');
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
    colMarginY(field) {
      if(field.activated === false || field.visible === false) {
        return '0';
      } else if(field.type === 'wrapper' || field.type === 'subform' ) {
        return `${this.marginY - (field.formConf.marginY || 15)}px`;
      } else {
        return `${this.marginY}px`;
      }
    },
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
</script>
