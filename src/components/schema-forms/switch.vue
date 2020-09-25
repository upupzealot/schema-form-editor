<template>
  <el-row class="schema-form">
    <el-col>
      <el-form-item label="开-文字">
        <el-input v-model="field.activeText" />
      </el-form-item>
      <el-form-item label="关-文字">
        <el-input v-model="field.inactiveText" />
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
