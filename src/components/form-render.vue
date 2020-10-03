<template>
  <el-form
    ref="form"
    :label-width="formConf.labelWidth"
    :label-position="formConf.labelPosition"
    :model="data"
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
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import Input from '@/components/form-items/input';
import Select from '@/components/form-items/select';
import Radio from '@/components/form-items/radio';
import Checkbox from '@/components/form-items/checkbox';
import SSwitch from '@/components/form-items/switch';
import DatePicker from '@/components/form-items/date-picker';

export default {
  components: {
    Input,
    Select,
    Radio,
    Checkbox,
    SSwitch,
    DatePicker,
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
