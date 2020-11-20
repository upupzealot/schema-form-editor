<template>
  <StandardForm>
    <template slot="basic">
      <el-form-item
        label="组件模式"
        class="schema-form"
      >
        <el-select v-model="field.mode">
          <!-- year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange -->
          <el-option
            label="时刻"
            value="datetime"
          />
          <el-option
            label="时间范围"
            value="datetimerange"
          />
          <el-option
            label="日期"
            value="date"
          />
          <el-option
            label="多个日期"
            value="dates"
          />
          <el-option
            label="日期范围"
            value="daterange"
          />
          <el-option
            label="周"
            value="week"
          />
          <!-- <el-option
            label="周范围"
            value="weekrange"
          /> -->
          <el-option
            label="月"
            value="month"
          />
          <el-option
            label="月范围"
            value="monthrange"
          />
          <el-option
            label="年"
            value="year"
          />
          <!-- <el-option
            label="年范围"
            value="yearrange"
          /> -->
        </el-select>
      </el-form-item>
      <el-form-item
        label="占位符"
        prop="placeholder"
      >
        <el-input
          v-model="field.placeholder"
        />
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import standard from './standard-mixin';

export default {
  mixins: [standard],
};
</script>
