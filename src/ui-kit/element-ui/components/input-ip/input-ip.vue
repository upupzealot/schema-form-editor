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
    <div style="display: flex; align-items: center;">
      <el-input
        ref="snippet0"
        v-model="ip0"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        class="ip-snippet"
      />.
      <el-input
        ref="snippet1"
        v-model="ip1"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        @keyup.backspace="onDelete(1)"
        @keyup.backspace.native="onDeleteNative(1)"
        class="ip-snippet"
      />.
      <el-input
        ref="snippet2"
        v-model="ip2"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        @keyup.backspace="onDelete(2)"
        @keyup.backspace.native="onDeleteNative(2)"
        class="ip-snippet"
      />.
      <el-input
        ref="snippet3"
        v-model="ip3"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        @keyup.backspace="onDelete(3)"
        @keyup.backspace.native="onDeleteNative(3)"
        class="ip-snippet"
      />
    </div>
  </el-form-item>
</template>

<style scoped>
.form-item .ip-snippet.el-input {
  margin: 0 5px;
}
.form-item .ip-snippet.el-input:first-of-type {
  margin-left: 0;
}
.form-item .ip-snippet.el-input:last-of-type {
  margin-right: 0;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'
import inputIpMixin from '../../../common/components/input-ip-mixin'
import validators from '../../../common/components/input-ip-valid'

export default {
  type: 'input-ip',
  mixins: [formItemMixin, inputIpMixin],
  validators,
};
</script>
