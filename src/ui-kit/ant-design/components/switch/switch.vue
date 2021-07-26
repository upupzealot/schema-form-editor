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
    :style="{
      marginBottom: colMarginY,
      display: 'flex',
      flexDirection: isLabelTop ? 'column' : '',
    }"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <a-switch
      v-model="data[field.name]"
      v-model:checked="data[field.name]"
      :disabled="disabled"
      :checked-children="field.activeText"
      :un-checked-children="field.inactiveText"
    />
  </component>
</template>

<script>
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  computed: {
    activeValue() {
      return this.parse(this.field.activeValue, true);
    },
    inactiveValue() {
      return this.parse(this.field.inactiveValue, false);
    }
  },
  methods: {
    parse(str, defaultVal) {
      if(!str) {
        return defaultVal;
      }

      if(str === 'true') {
        return true;
      }
      if(str === 'false') {
        return false;
      }

      const num = Number(str);
      if(!isNaN(num)) {
        return num;
      }

      return str;
    }
  }
};
</script>
