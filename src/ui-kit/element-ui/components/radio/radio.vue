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
    
    <!-- 这里的 label 是值 -->
    <el-radio
      v-for="option in optionList"
      :key="option.value"
      v-model="data[field.name]"
      :label="option.value"
      :disabled="disabled"
    >
      {{ option.label }}
    </el-radio>
  </el-form-item>
</template>

<script>
import formItemMixin from '@/ui-kit/element-ui/common/form-item/mixin'
import optionListMixin from '@/ui-kit/common/form-item/option-list-mixin.js'

export default {
  mixins: [formItemMixin, optionListMixin],
};
</script>
