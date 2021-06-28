<template>
  <div
    class="example-component"
    :style="{
      border: '1px dashed #eee',
      lineHeight: 0,
      height: '40px',
    }"
  >
    <el-tag size="mini">
      容器
    </el-tag>
  </div>
</template>

<script>
export default {
  type: 'wrapper',
  label: '容器',
}
</script>
