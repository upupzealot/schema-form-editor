<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    :[formItemPropName]="field.name"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{
      marginBottom: colMarginY,
      display: 'flex',
      flexDirection: isLabelTop ? 'column' : '',
      flexWrap: 'nowrap',
    }"
    :sfr-f="field.name"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <div style="display: flex; align-items: center;">
      <a-input
        ref="snippet0"
        v-model="ip0"
        v-model:value="ip0"
        :type="field.mode"
        :placeholder="placeholder0"
        :disabled="disabled"
        :[readonlyProp]="readonly"
        class="ip-snippet"
      />.
      <a-input
        ref="snippet1"
        v-model="ip1"
        v-model:value="ip1"
        :type="field.mode"
        :placeholder="placeholder1"
        :disabled="disabled"
        :[readonlyProp]="readonly"
        @keyup.backspace="onDelete(1)"
        @keyup.backspace.native="onDeleteNative(1)"
        class="ip-snippet"
      />.
      <a-input
        ref="snippet2"
        v-model="ip2"
        v-model:value="ip2"
        :type="field.mode"
        :placeholder="placeholder2"
        :disabled="disabled"
        :[readonlyProp]="readonly"
        @keyup.backspace="onDelete(2)"
        @keyup.backspace.native="onDeleteNative(2)"
        class="ip-snippet"
      />.
      <a-input
        ref="snippet3"
        v-model="ip3"
        v-model:value="ip3"
        :type="field.mode"
        :placeholder="placeholder3"
        :disabled="disabled"
        :[readonlyProp]="readonly"
        @keyup.backspace="onDelete(3)"
        @keyup.backspace.native="onDeleteNative(3)"
        class="ip-snippet"
      />
    </div>
  </component>
</template>

<style scoped>
.form-item .ip-snippet.ant-input {
  margin: 0 4px;
}
.form-item .ip-snippet.ant-input:first-of-type {
  margin-left: 0;
}
.form-item .ip-snippet.ant-input:last-of-type {
  margin-right: 0;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'
import inputIpMixin from '../../../common/components/input-ip-mixin'
import validators from '../../../common/components/input-ip-valid'

export default {
  type: 'input-ip',
  mixins: [formItemMixin, inputIpMixin],
  validators,
};
</script>
