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
    <el-date-picker
      :key="calendarId"
      v-model="data[field.name]"
      :type="field.mode"
      :disabled="disabled"
      :placeholder="field.placeholder"
      value-format="timestamp"
      style="width: 100%;"
    />
  </el-form-item>
</template>

<script>
import { $id } from '@/ui-kit/common/util-funcs.js'
import formItemMixin from '@/ui-kit/element-ui/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  data() {
    return {
      calendarId: this.$id(),
    }
  },
  watch: {
    'field.mode': {
      handler() {
        this.$set(this.data, this.field.name, undefined);
        this.calendarId = this.$id();
        this.$forceUpdate();
      }
    }
  },
  methods: { $id },
  defaultSchema: {},
};
</script>
