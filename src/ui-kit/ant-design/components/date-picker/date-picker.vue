<template>
  <component
    :is="formItemIs"
    v-if="activated"
    v-show="visible"
    ref="formItem"
    :prop="field.name"
    :name="field.name /* antd 2.x prop 属性改为 name */"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    style="margin-bottom: 0;"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <component
      :is="componentIs"
      v-model="data[field.name]"
      v-model:value="data[field.name]"
      :mode="panelMode"
      :show-time="field.mode === 'datetime' || field.mode === 'datetimerange'"
      :format="defaultFormat"
      :open="open"
      :disabled="disabled"
      :placeholder="field.placeholder"
      :value-format="valueFormat"
      style="width: 100%;"
      @openChange="onOpenChange"
      :getCalendarContainer="() => $refs.formItem.$el"
      @panelChange="onPanelChange"
    />
  </component>
</template>

<script>
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  data() {
    return {
      open: false,
      panelMode: this.mode,
    }
  },
  computed: {
    mode() {
      return this.field.mode || 'date';
    },
    valueFormat() {
      return this.field.valueFormat || 'x';
    },
    componentIs() {
      if(this.mode === 'week') {
        return 'a-week-picker';
      } else if(this.mode === 'month') {
        return 'a-month-picker';
      } else if(this.mode === 'datetimerange'
      || this.mode === 'daterange'
      || this.mode === 'weekrange'
      || this.mode === 'monthrange'
      || this.mode === 'yearrange') {
        return 'a-range-picker';
      } else {
        return 'a-date-picker';
      }
    },
    defaultFormat() {
      if (this.mode === 'date' || this.mode === 'daterange'
      || !this.mode) {
        return 'YYYY-MM-DD';
      } else if (this.mode === 'week' || this.mode === 'weekrange') {
        return 'YYYY-wo';
      } else if (this.mode === 'month' || this.mode === 'monthrange') {
        return 'YYYY-MM';
      } else if (this.mode === 'year' || this.mode === 'yearrange'
      || this.mode === 'decade') {
        return 'YYYY';
      } else {
        return 'YYYY-MM-DD HH:mm:ss';
      } 
    }
  },
  watch: {
    mode() {
      // 可能产生单一值和数组之间的切换
      this.$set(this.data, this.field.name, undefined);
    }
  },
  methods: {
    onOpenChange(open) {
      if (open) {
        if (this.mode === 'datetime') {
          this.panelMode = 'date';
        } else if (this.mode === 'datetimerange'
        || this.mode === 'weekrange') {
          //面板 mode 没有 week 模式
          this.panelMode = ['date', 'date'];
        } else if (this.mode === 'monthrange') {
          this.panelMode = ['month', 'month'];
        } else if (this.mode === 'yearrange') {
          this.panelMode = ['year', 'year'];
        } else if (this.mode === 'decade') {
          this.panelMode = 'year';
        } else {
          this.panelMode = this.mode;
        }
      }
      this.open = open;
    },
    onPanelChange(value, panelMode) {
      this.panelMode = panelMode;
      if((this.mode === 'year' || this.mode === 'decade') && !panelMode) {
        this.$set(this.data, this.field.name, value.format(this.valueFormat));
        this.open = false;
      }
      if(this.mode === 'monthrange') {
        this.$set(this.data, this.field.name, value.map(v => v.format(this.valueFormat)));
        this.panelMode = ['month', 'month'];
      }
      if(this.mode === 'yearrange') {
        this.$set(this.data, this.field.name, value.map(v => v.format(this.valueFormat)));
        this.panelMode = ['year', 'year'];
      }
    }
  }
};
</script>
