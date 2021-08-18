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
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    
    <a-radio-group
      v-model="data[field.name]"
      v-model:value="data[field.name]"
      :button-style="buttonStyle"
      :disabled="disabled"
    >
      <component
        :is="buttonComponent"
        v-for="option in optionList"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </component>
    </a-radio-group>
  </component>
</template>

<script>
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'
import optionListMixin from '@/ui-kit/common/form-item/option-list-mixin.js'

export default {
  mixins: [formItemMixin, optionListMixin],
  computed: {
    buttonComponent() {
      if(this.field.mode === 'button'
      || this.field.mode === 'border-button') {
        return 'a-radio-button';
      } else {
        return 'a-radio';
      }
    },
    buttonStyle() {
      if(this.field.mode === 'button') {
        return 'solid';
      } else if (this.field.mode === 'border-button') {
        return 'outline';
      } else {
        return undefined;
      }
    }
  }
};
</script>
