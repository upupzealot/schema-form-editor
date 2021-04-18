<template>
  <el-form label-width="80px">
    <el-form-item label="标签宽度">
      <el-input
        v-model="labelWidth"
        :placeholder="defaults.labelWidth"
      />
    </el-form-item>
    <el-form-item label="行间距">
      <el-input
        v-model.number="marginY"
        :placeholder="`${defaults.marginY}`"
      />
    </el-form-item>
    <el-form-item label="列间距">
      <el-input
        v-model.number="marginX"
        :placeholder="`${defaults.marginX}`"
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
        marginX: 20,
        marginY: 15,
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
    marginX: {
      get() {
        return this.formConf.marginX;
      },
      set(marginX) {
        if(marginX && marginX !== this.defaults.marginX) {
          this.$set(this.formConf, 'marginX', marginX);
        } else {
          this.$set(this.formConf, 'marginX', undefined);
        }
      }
    },
    marginY: {
      get() {
        return this.formConf.marginY || this.defaults.marginY;
      },
      set(marginY) {
        if(marginY && marginY !== this.defaults.marginY) {
          this.$set(this.formConf, 'marginY', marginY);
        } else {
          this.$set(this.formConf, 'marginY', undefined);
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
