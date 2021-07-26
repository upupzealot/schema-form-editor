<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    :prop="field.name"
    :name="field.name /* antd 2.x prop 属性改为 name */"
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
      :disabled="disabled"
    >
      <a-radio
        v-for="option in optionList"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </a-radio>
    </a-radio-group>
  </component>
</template>

<script>
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'
import optionListMixin from '@/ui-kit/common/form-item/option-list-mixin.js'

export default {
  mixins: [formItemMixin, optionListMixin],
};
</script>
