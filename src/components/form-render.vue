<template>
  <el-form
    ref="form"
    :label-width="formConf.labelWidth"
    :label-position="formConf.labelPosition"
    :model="data"
    :rules="validRules"
  >
    <el-row :gutter="formConf.gutter">
      <el-col
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
        <Select
          v-if="field.type === 'select'"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Radio
          v-if="field.type === 'radio'"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Checkbox
          v-if="field.type === 'checkbox'"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <SSwitch
          v-if="field.type === 'switch'"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <DatePicker
          v-if="field.type === 'date-picker'"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Blank
          v-if="field.type === 'blank'"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Subform
          v-if="field.type === 'subform'"
          ref="subformItems"
          :scenario="scenario"
          :schema="field"
          :data="data[field.name]"
          :sup-nodes="supNodeList"
        />
        <ItemList
          v-if="field.type === 'item-list'"
          ref="subformItems"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
      </el-col>
    </el-row>
  </el-form>
</template>

<style>
.form-item.readonly {
  pointer-events: none;
}
</style>

<script>
import _ from 'lodash';

import Input from '@/components/form-items/input';
import Select from '@/components/form-items/select';
import Radio from '@/components/form-items/radio';
import Checkbox from '@/components/form-items/checkbox';
import SSwitch from '@/components/form-items/switch';
import DatePicker from '@/components/form-items/date-picker';

import Blank from '@/components/form-items/blank';
import Subform from '@/components/form-items/subform';
import ItemList from '@/components/form-items/item-list';

export default {
  name: 'FormRender',
  components: {
    Input,
    Select,
    Radio,
    Checkbox,
    SSwitch,
    DatePicker,
    Blank,
    Subform,
    ItemList,
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
    fieldList() {
      return this.schema.fieldList;
    },
    validRules() {
      _.filter
      return _(this.schema.validRules)
        .pickBy(rules => rules && rules.length)
        .mapValues(rules => {
          return rules.map(rule => {
            if(rule.type === 'required') {
              return {
                required: true,
                message: rule.note,
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
              return rule;
            }
          })
        })
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
