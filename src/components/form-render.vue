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
          :field="field"
          :form="data"
        />
        <Select
          v-if="field.type === 'select'"
          :field="field"
          :form="data"
        />
        <Radio
          v-if="field.type === 'radio'"
          :field="field"
          :form="data"
        />
        <Checkbox
          v-if="field.type === 'checkbox'"
          :field="field"
          :form="data"
        />
        <SSwitch
          v-if="field.type === 'switch'"
          :field="field"
          :form="data"
        />
        <DatePicker
          v-if="field.type === 'date-picker'"
          :field="field"
          :form="data"
        />
        <Blank
          v-if="field.type === 'blank'"
          :field="field"
          :form="data"
        />
        <FormRender
          v-if="field.type === 'subform'"
          :schema="field"
          :data="data[field.name]"
        />
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import _ from 'lodash';

import Input from '@/components/form-items/input';
import Select from '@/components/form-items/select';
import Radio from '@/components/form-items/radio';
import Checkbox from '@/components/form-items/checkbox';
import SSwitch from '@/components/form-items/switch';
import DatePicker from '@/components/form-items/date-picker';

import Blank from '@/components/form-items/blank';

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
  },
  props: {
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
                    callback(rule.note);
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
  methods: {
    async validate() {
      return new Promise(resolve => {
        this.$refs['form'].validate(resolve);
      });
    }
  }
}
</script>
