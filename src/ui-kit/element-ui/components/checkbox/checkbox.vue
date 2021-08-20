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

    <el-checkbox-group v-model="data[field.name]">
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
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
import formItemMixin from '../../common/form-item/mixin'
import optionListMixin from '../../../common/form-item/option-list-mixin.js'

export default {
  mixins: [formItemMixin, optionListMixin],
  created() {
    if(!this.data[this.field.name]) {
      this.$set(this.data, this.field.name, []);
    }    
  },
  computed: {
    buttonComponent() {
      if(this.field.mode === 'button') {
        return 'el-checkbox-button';
      } else {
        return 'el-checkbox';
      }
    },
    hasBorder() {
      return this.field.mode === 'border';
    }
  }
};
</script>
