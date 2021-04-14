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
    <a-input-number
      v-model="data[field.name]"
      v-model:value="data[field.name]"
      :min="field.min"
      :max="field.max"
      :step="field.step"
      :precision="field.precision"
      :placeholder="field.placeholder"
      :disabled="disabled"
      :readonly="readonly"
      style="width: 100%;"
    />
  </component>
</template>

<script>
import isVue2 from 'vue';
import formItemMixin from '@/ui-kit/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  computed: {
    formItemIs() {
      return isVue2 ? 'a-form-model-item' : 'a-form-item';
    }
  }
};
</script>
