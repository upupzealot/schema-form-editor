<template>
  <el-form label-width="80px">
    <template v-for="field in fieldList">
      <Input
        v-if="field.type === 'input'"
        :key="field.id"
        :field="field"
        :form="data"
      />
      <Select
        v-if="field.type === 'select'"
        :key="field.id"
        :field="field"
        :form="data"
      />
      <Radio
        v-if="field.type === 'radio'"
        :key="field.id"
        :field="field"
        :form="data"
      />
      <Checkbox
        v-if="field.type === 'checkbox'"
        :key="field.id"
        :field="field"
        :form="data"
      />
      <SSwitch
        v-if="field.type === 'switch'"
        :key="field.id"
        :field="field"
        :form="data"
      />
      <DatePicker
        v-if="field.type === 'date-picker'"
        :key="field.id"
        :field="field"
        :form="data"
      />
    </template>
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
    fieldList() {
      return this.schema.fieldList;
    }
  }
}
</script>
