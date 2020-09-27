<template>
  <el-form label-width="80px">
    <el-form-item label="标签宽度">
      <el-input v-model="formConf.labelWidth" />
    </el-form-item>
    <el-form-item label="列间距">
      <el-input v-model="formConf.gutter" />
    </el-form-item>
    <el-form-item label="对齐方式">
      <el-radio
        v-model="formConf.labelPosition"
        label="left"
      >
        左对齐
      </el-radio>
      <el-radio
        v-model="formConf.labelPosition"
        label="right"
      >
        右对齐
      </el-radio>
      <el-radio
        v-model="formConf.labelPosition"
        label="top"
      >
        顶部对齐
      </el-radio>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  computed: {
    formConf: {
      get() {
        return this.$store.state.formConf;
      },
      set(formConf) {
        this.$store.commit('setFormConf', formConf);
      },
    },
  },
}
</script>
