<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{ marginBottom: colMarginY }"
    :sfr-f="field.name"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-input
      v-model="data[field.name]"
      :type="field.mode"
      :show-password="field.isPassword"
      :autosize="field.autosize && {
        minRows: field.minRows || 2,
        maxRows: field.maxRows || undefined,
      }"
      :clearable="field.clearable"
      :placeholder="field.placeholder"
      :disabled="disabled"
      :readonly="readonly"
      style="min-height: 40px; /* 设置最小高度 40px 防止抖动 */"
    >
      <template
        v-if="field.prepend"
        v-slot:prepend
      >
        {{ field.prepend }}
      </template>
      <template
        v-if="field.append"
        v-slot:append
      >
        {{ field.append }}
      </template>
    </el-input>
  </el-form-item>
</template>

<script>
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin]
};
</script>
