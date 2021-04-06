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
    <el-switch
      v-model="data[field.name]"
      :disabled="disabled"
      :active-text="field.activeText"
      :active-value="activeValue"
      :inactive-text="field.inactiveText"
      :inactive-value="inactiveValue"
    />
  </el-form-item>
</template>

<script>
import standardMixin from './standard-mixin'

export default {
  mixins: [standardMixin],
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
  },
  defaultSchema: {}
};
</script>
