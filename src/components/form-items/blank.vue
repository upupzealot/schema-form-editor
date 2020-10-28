<template>
  <el-form-item
    v-if="activated"
    label="　"
    class="blank-wrap"
  >
    <div class="blank" />
  </el-form-item>
</template>

<style>
.blank-wrap .el-form-item__label {
  color: transparent;
  content: none;
  pointer-events: none;
}
.blank-wrap .blank {
  width: 100%;
  height: 40px;
}
</style>
