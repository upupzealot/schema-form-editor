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
    :style="{ marginBottom: colMarginY, display: 'flex' }"
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
      style="width: 100%;"
    />
  </component>
</template>

<script>
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
