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
    }"
    :sfr-f="field.name"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <component
      :is="field.isPassword ? 'a-input-password' : 'a-input'"
      v-model="data[field.name]"
      v-model:value="data[field.name]"
      :type="field.mode"
      :auto-size="field.autosize && {
        minRows: field.minRows || 2,
        maxRows: field.maxRows || undefined,
      }"
      :allow-clear="field.clearable"
      :placeholder="field.placeholder"
      :disabled="disabled"
      :read-only="readonly"
    >
      <template
        v-if="field.prepend"
        v-slot:addonBefore
      >
        {{ field.prepend }}
      </template>
      <template
        v-if="field.append"
        v-slot:addonAfter
      >
        {{ field.append }}
      </template>
    </component>
  </component>
</template>

<script>
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
