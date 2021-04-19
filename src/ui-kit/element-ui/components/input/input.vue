<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    style="margin-bottom: 0"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-input
      v-model="data[field.name]"
      :type="field.mode"
      :placeholder="field.placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :show-password="field.isPassword"
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
