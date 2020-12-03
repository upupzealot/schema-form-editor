<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
  >
    <template slot="label">
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
import standardMixin from './standard-mixin'
import optionListMixin from './option-list-mixin'

export default {
  mixins: [standardMixin, optionListMixin],
  defaultSchema: {
    options: [{
      label: '选项一',
      value: 'option1',
    }, {
      label: '选项二',
      value: 'option2',
    }],
  }
};
</script>
