<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>

    <el-checkbox-group v-model="data[field.name]">
      <!-- 这里的 label 是值 -->
      <el-checkbox
        v-for="option in optionList"
        :key="option.value"
        :label="option.value"
        :disabled="disabled"
      >
        {{ option.label }}
      </el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
import standardMixin from './standard-mixin'
import optionListMixin from './option-list-mixin'

export default {
  mixins: [standardMixin, optionListMixin],
  created() {
    if(!this.data[this.field.name]) {
      this.$set(this.data, this.field.name, []);
    }    
  },
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
