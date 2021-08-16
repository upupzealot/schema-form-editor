<template>
  <el-form label-width="40px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="标签">
          <el-input v-model="option.label" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="值"
          label-width="40px"
        >
          <el-input v-model="value" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default() {
        return {};
      }
    },
    typeValue: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    value: {
      get() {
        return `${this.option.value}`
      },
      set(val) {
        if(this.typeValue) {
          this.$set(this.option, 'value', this.transValue(val));
        } else {
          this.$set(this.option, 'value', val);
        }
      }
    },
  },
  watch: {
    typeValue(val) {
      if(val) {
        this.$set(this.option, 'value', this.transValue(this.option.value));
      } else {
        this.$set(this.option, 'value', `${this.option.value}`);
      }
    }
  },
  methods: {
    transValue(val) {
      if(`${val}` === 'true' || `${val}` === 'false') {
        return JSON.parse(val);
      }
      const numVal = Number(val)
      if(numVal || numVal === 0) {
        return numVal;
      }
      return val;
    }
  }
}
</script>
