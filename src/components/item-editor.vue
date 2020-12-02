<template>
  <el-row>
    <el-col class="item-editor">
      <!-- 表单属性 -->
      <el-divider content-position="left">
        <i
          :class="{ 'el-icon-circle-plus-outline': !formConfOpen, 'el-icon-remove-outline': formConfOpen }"
          @click="formConfOpen = !formConfOpen"
        />
        表单属性
      </el-divider>
      <el-collapse-transition>
        <div
          v-show="formConfOpen"
          class="field-group"
        >
          <FormConfEditor />
        </div>
      </el-collapse-transition>

      <!-- 表单项编辑器 -->
      <InputForm v-if="field.type === 'input'" />
      <InputNumberForm v-if="field.type === 'input-number'" />
      <SelectForm v-if="field.type === 'select'" />
      <RadioForm v-if="field.type === 'radio'" />
      <CheckboxForm v-if="field.type === 'checkbox'" />
      <SSwitchForm v-if="field.type === 'switch'" />
      <DatePickerForm v-if="field.type === 'date-picker'" />
      <BlankForm v-if="field.type === 'blank'" />
      <WrapperForm v-if="field.type === 'wrapper'" />
      <SubformForm v-if="field.type === 'subform'" />
      <ItemList v-if="field.type === 'item-list'" />
    </el-col>
  </el-row>
</template>

<style>
.item-editor .divider-wrap {
  padding: 1px;
}
.item-editor .el-divider__text {
  color: #ccc;
}
.el-divider .el-divider__text i {
  cursor: pointer;
  margin-right: 5px;
}
.el-divider .el-divider__text i:hover {
  color: #409EFF;
}
</style>

<script>
import FormConfEditor from '@/components/form-conf-editor';

import InputForm from '@/components/schema-forms/input';
import InputNumberForm from '@/components/schema-forms/input-number';
import SelectForm from '@/components/schema-forms/select';
import RadioForm from '@/components/schema-forms/radio';
import CheckboxForm from '@/components/schema-forms/checkbox';
import SSwitchForm from '@/components/schema-forms/switch';
import DatePickerForm from '@/components/schema-forms/date-picker';

import BlankForm from '@/components/schema-forms/blank';
import WrapperForm from '@/components/schema-forms/wrapper'
import SubformForm from '@/components/schema-forms/subform';
import ItemList from '@/components/schema-forms/item-list';

const spanValues = Array.from({ length: 23 }, (v, i) => i + 1);

export default {
  components: {
    InputForm,
    InputNumberForm,
    FormConfEditor,
    SelectForm,
    RadioForm,
    CheckboxForm,
    SSwitchForm,
    DatePickerForm,
    BlankForm,
    WrapperForm,
    SubformForm,
    ItemList,
  },
  data() {
    return {
      formConfOpen: false,
      layoutOpen: false,
      basicOpen: true,
      validOpen: true,
    }
  },
  computed: {
    field() {
      return this.$store.state.activeField;
    },
    form() {
      return this.$store.state.$root;
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
