<template>
  <el-form label-width="80px">
    <el-form-item label="标签宽度">
      <el-input
        v-model="labelWidth"
        :placeholder="defaults.labelWidth"
      />
    </el-form-item>
    <el-form-item label="列间距">
      <el-input
        v-model.number="gutter"
        :placeholder="`${defaults.gutter}`"
      />
    </el-form-item>
    <el-form-item
      label="对齐方式"
      style="margin: 0;"
    >
      <el-radio
        v-model="labelPosition"
        label="left"
      >
        左对齐
      </el-radio>
      <el-radio
        v-model="labelPosition"
        label="right"
      >
        右对齐
      </el-radio>
      <el-radio
        v-model="labelPosition"
        label="top"
      >
        顶部对齐
      </el-radio>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      defaults: {
        labelWidth: '80px',
        gutter: 20,
        labelPosition: 'right',
      }
    }
  },
  computed: {
    formConf() {
      return this.$store.state.activeForm.formConf;
    },
    labelWidth: {
      get() {
        return this.formConf.labelWidth;
      },
      set(width) {
        if(width && width !== this.defaults.labelWidth) {
          this.$set(this.formConf, 'labelWidth', width);
        } else {
          this.$set(this.formConf, 'labelWidth', undefined);
        }
      }
    },
    gutter: {
      get() {
        return this.formConf.gutter;
      },
      set(gutter) {
        if(gutter && gutter !== this.defaults.gutter) {
          this.$set(this.formConf, 'gutter', gutter);
        } else {
          this.$set(this.formConf, 'gutter', undefined);
        }
      }
    },
    labelPosition: {
      get() {
        return this.formConf.labelPosition || 'right';
      },
      set(labelPosition) {
        if(labelPosition && labelPosition !== this.defaults.labelPosition) {
          this.$set(this.formConf, 'labelPosition', labelPosition);
        } else {
          this.$set(this.formConf, 'labelPosition', undefined);
        }
      }
    },
  },
}
</script>
