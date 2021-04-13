<template>
  <el-form label-width="80px">
    <el-form-item label="标签列宽">
      <el-input
        v-model.number="labelCol"
        :placeholder="defaults.labelCol"
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
        labelCol: 3,
        gutter: 20,
        labelPosition: 'right',
      }
    }
  },
  computed: {
    formConf() {
      return this.$store.state.activeForm.formConf;
    },
    labelCol: {
      get() {
        return this.formConf.labelCol;
      },
      set(col) {
        if(col && col !== this.defaults.labelCol) {
          this.$set(this.formConf, 'labelCol', col);
        } else {
          this.$set(this.formConf, 'labelCol', undefined);
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
