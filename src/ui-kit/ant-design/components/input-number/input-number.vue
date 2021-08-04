<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    :[formItemPropName]="field.name"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
    :class="{
      'form-item': true,
      'input-number': true,
      'readonly': readonly
    }"
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
    <a-input-number
      v-model="data[field.name]"
      v-model:value="data[field.name]"
      :min="field.min"
      :max="field.max"
      :step="field.step"
      :precision="field.precision"
      :placeholder="field.placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="{
        'left-align': field.textAlign === 'left',
        'center-align': !field.textAlign,
        'right-align': field.textAlign === 'right'
      }"
      style="width: 100%;"
    />
  </component>
</template>

<style>
.input-number .ant-input-number.left-align input {
  text-align: left;
}
.input-number .ant-input-number.center-align input {
  text-align: center;
}
.input-number .ant-input-number.right-align input {
  text-align: right;
}
.input-number .ant-input-number.right-align input:hover {
  padding-right: 33px; /* space for control-btn */
}
</style>

<script>
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
