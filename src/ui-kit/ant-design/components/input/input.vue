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
      :is="component"
      v-model="data[field.name]"
      v-model:value="data[field.name]"
      :auto-size="field.autosize && {
        minRows: field.minRows || 2,
        maxRows: field.maxRows || undefined,
      }"
      :allow-clear="field.clearable"
      :placeholder="field.placeholder"
      :disabled="disabled"
      :[readonlyProp]="readonly"
      @keyup.enter="fieldSubmitUnnative"
      @keyup.enter.native="fieldSubmitNative"
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
import formItemMixin from '../../common/form-item/mixin'
import inputMixin from '../../../common/components/input-mixin'

export default {
  mixins: [formItemMixin, inputMixin],
  computed: {
    component() {
      if(this.field.mode === 'textarea') {
        return 'a-textarea';
      } else {
        if(this.field.isPassword) {
          return 'a-input-password';
        } else {
          return 'a-input';
        }
      }
    }
  },
};
</script>
