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

    <el-radio-group v-model="data[field.name]">
      <!-- 这里的 label 是值 -->
      <component
        :is="buttonComponent"
        v-for="option in optionList"
        :key="option.value"
        :label="option.value"
        :border="hasBorder"
        :disabled="disabled"
      >
        {{ option.label }}
      </component>
    </el-radio-group>
  </el-form-item>
</template>

<script>
import formItemMixin from '../../common/form-item/mixin'
import optionListMixin from '../../../common/form-item/option-list-mixin.js'

export default {
  mixins: [formItemMixin, optionListMixin],
  computed: {
    buttonComponent() {
      if(this.field.mode === 'button'
      || this.field.mode === 'border-button') {
        return 'el-radio-button';
      } else {
        return 'el-radio';
      }
    },
    hasBorder() {
      return this.field.mode === 'border';
    }
  }
};
</script>

<style scoped>
.el-radio-group .el-radio.is-bordered{
  margin-bottom: 8px;
}
</style>