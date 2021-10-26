<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{ marginBottom: colMarginY }"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-time-picker
      :key="calendarId"
      v-model="data[field.name]"
      :is-range="field.mode === 'timerange'"
      :disabled="disabled"
      :placeholder="field.placeholder"
      :value-format="valueFormat"
      style="width: 100%;"
      @change="fieldSubmit"
      @clear="fieldSubmit"
    />
  </el-form-item>
</template>

<script>
import isVue2 from 'vue';

import { $id } from '../../../common/util-funcs.js'
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  data() {
    return {
      calendarId: $id(),
    }
  },
  computed: {
    valueFormat() {
      return isVue2 ? 'timestamp' : 'x';
    },
  },
  watch: {
    'field.mode': {
      handler() {
        this.$set(this.data, this.field.name, undefined);
        this.calendarId = $id();
        this.$forceUpdate();
      }
    }
  },
  defaultSchema: {},
};
</script>
