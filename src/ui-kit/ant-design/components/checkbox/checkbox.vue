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

    <div>
      <a-checkbox
        v-if="field.hasSelectAll"
        :checked="checkAll"
        :indeterminate="isIndeterminate"
        style="margin-right: 30px;"
        @change="onCheckAllChange"
      >
        全选
      </a-checkbox>
    </div>
    <a-checkbox-group
      v-model:value="data[field.name]"
      :value="data[field.name]"
      :disabled="disabled"
    >
      <!-- 这里的 label 是值 -->
      <a-checkbox
        v-for="option in optionList"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </a-checkbox>
    </a-checkbox-group>
  </component>
</template>

<script>
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'
import optionListMixin from '@/ui-kit/common/form-item/option-list-mixin.js'
import checkboxMixin from '../../../common/components/checkbox-mixin'

export default {
  mixins: [formItemMixin, optionListMixin, checkboxMixin],
};
</script>
