<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    ref="formItem"
    :[formItemPropName]="field.name"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{
      marginBottom: colMarginY,
      display: 'flex',
      flexDirection: isLabelTop ? 'column' : '',
    }"
    :sfr-f="field.name"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <a-select
      v-model="fieldValue"
      v-model:value="fieldValue"
      :disabled="disabled"
      :placeholder="field.placeholder"
      :allow-clear="field.clearable"
      :mode="field.multiple ? 'multiple' : undefined"
      :get-popup-container="() => $refs.formItem.$el"
      style="width: 100%"
      @change="fieldSubmit"
    >
      <a-select-option
        v-for="option in optionList"
        :key="option.value"
        :value="isBoolean(option.value) ? `${option.value}` : option.value"
      >
        {{ option.label }}
      </a-select-option>
    </a-select>
  </component>
</template>

<style>
.form-item.readonly .el-input__suffix-inner {
  pointer-events: none;
}
</style>

<script>
import { isBoolean } from 'lodash';
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'
import optionListMixin from '@/ui-kit/common/form-item/option-list-mixin.js'
import selectMixin from '../../../common/components/select-mixin'

export default {
  mixins: [formItemMixin, optionListMixin, selectMixin],
  computed: {
    fieldValue: {
      get() {
        const fv = this.data[this.field.name];
        if(fv === true || fv === false) {
          return `${fv}`;
        }
        return fv;
      },
      set(val) {
        if(this.field.typeValue && (val === 'true' || val === 'false')) {
          this.$set(this.data, this.field.name, JSON.parse(val));
        } else {
          this.$set(this.data, this.field.name, val);
        }
      }
    }
  },
  methods: {
    isBoolean
  }
};
</script>
