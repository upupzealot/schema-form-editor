<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    ref="formItem"
    :prop="field.name"
    :name="field.name /* antd 2.x prop 属性改为 name */"
    :labelCol="labelCol"
    :wrapperCol="wrapperCol"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    style="margin-bottom: 0; display: flex;"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <a-select
      v-model="data[field.name]"
      v-model:value="data[field.name]"
      :disabled="disabled"
      :placeholder="field.placeholder"
      :allow-clear="field.clearable"
      :mode="field.multiple ? 'multiple' : undefined"
      :get-popup-container="() => $refs.formItem.$el"
      style="width: 100%"
    >
      <a-select-option
        v-for="option in optionList"
        :key="option.value"
        :value="option.value"
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
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'
import optionListMixin from '@/ui-kit/common/form-item/option-list-mixin.js'

export default {
  mixins: [formItemMixin, optionListMixin],
};
</script>
