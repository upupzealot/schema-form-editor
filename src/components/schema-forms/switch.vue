<template>
  <StandardForm>
    <template slot="basic">
      <el-form-item label="开-文字">
        <el-input v-model="field.activeText" />
      </el-form-item>
      <el-form-item label="关-文字">
        <el-input v-model="field.inactiveText" />
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
