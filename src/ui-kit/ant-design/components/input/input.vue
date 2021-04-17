<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    :prop="field.name"
    :name="field.name /* antd 2.x prop 属性改为 name */"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    style="margin-bottom: 0;"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <component
      :is="field.isPassword ? 'a-input-password' : 'a-input'"
      v-model="data[field.name]"
      v-model:value="data[field.name]"
      :type="field.mode"
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
