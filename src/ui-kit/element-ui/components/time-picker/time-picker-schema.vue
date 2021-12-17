<template>
  <StandardForm>
    <template v-slot:basic>
      <el-form-item
        label="组件模式"
        class="schema-form"
      >
        <el-select v-model="field.mode">
          <!-- year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange -->
          <el-option
            label="时刻"
            value="time"
          />
          <el-option
            label="时间范围"
            value="timerange"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="!isRange"
        label="占位符"
        prop="placeholder"
      >
        <el-input
          v-model="field.placeholder"
        />
      </el-form-item>
      <el-form-item
        v-if="isRange"
        label="开始占位符"
        label-width="90px"
        prop="start-placeholder"
      >
        <el-input
          v-model="field.startPlaceholder"
        />
      </el-form-item>
      <el-form-item
        v-if="isRange"
        label="结束占位符"
        label-width="90px"
        prop="end-placeholder"
      >
        <el-input
          v-model="field.endPlaceholder"
        />
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/framework/schema-item/mixin';

export default {
  type: 'time-picker',
  mixins: [schemaItemMixin],
  computed: {
    isRange() {
      return (this.field.mode || 'time').endsWith('range');
    }
  }
};
</script>
