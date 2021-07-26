<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    :prop="field.name"
    :name="field.name /* antd 2.x prop 属性改为 name */"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{ marginBottom: colMarginY, display: 'flex' }"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>

    <a-checkbox-group
      v-model="data[field.name]"
      v-model:value="data[field.name]"
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
import isVue2 from 'vue';
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'
import optionListMixin from '@/ui-kit/common/form-item/option-list-mixin.js'

export default {
  mixins: [formItemMixin, optionListMixin],
  created() {
    if(!this.data[this.field.name]) {
      this.$set(this.data, this.field.name, []);
    }    
  }
};
</script>
