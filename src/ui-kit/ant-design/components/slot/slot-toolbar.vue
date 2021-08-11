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
      插槽
    </el-tag>
  </div>
</template>

<script>
export default {
  type: 'slot',
  label: '插槽',
}
</script>
