<template>
  <el-form label-width="80px">
    <el-form-item label="Key">
      <el-input v-model="field.name" />
    </el-form-item>

    <el-form-item label="标签">
      <el-input v-model="field.label" />
    </el-form-item>

    <el-form-item label="栅格数">
      <el-input
        v-model="span"
        placeholder="1~24 之间，24 不用填"
      />
    </el-form-item>

    <el-form-item label="必填">
      <el-switch v-model="field.required" />
    </el-form-item>

    <SelectForm
      v-if="field.type === 'select'"
      :field="field"
    />
    <RadioForm
      v-if="field.type === 'radio'"
      :field="field"
    />
    <CheckboxForm
      v-if="field.type === 'checkbox'"
      :field="field"
    />
    <SSwitchForm
      v-if="field.type === 'switch'"
      :field="field"
    />
    <DatePickerForm
      v-if="field.type === 'date-picker'"
      :field="field"
    />
  </el-form>
</template>

<script>
import SelectForm from '@/components/schema-forms/select';
import RadioForm from '@/components/schema-forms/radio';
import CheckboxForm from '@/components/schema-forms/checkbox';
import SSwitchForm from '@/components/schema-forms/switch';
import DatePickerForm from '@/components/schema-forms/date-picker';

const spanValues = Array.from({ length: 23 }, (v, i) => i + 1);

export default {
  components: {
    SelectForm,
    RadioForm,
    CheckboxForm,
    SSwitchForm,
    DatePickerForm,
  },
  computed: {
    field() {
      return this.$store.state.activeField;
    },
    span: {
      get() {
        return this.field.span;
      },
      set(n) {
        const value = Number(n);
        this.$set(this.field, 'span', spanValues.includes(value) ? value : undefined);
      }
    }
  },
};
</script>
