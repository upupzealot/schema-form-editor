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
      列表
    </el-tag>
  </div>
</template>

<script>
export default {
  type: 'item-list',
  label: '列表',
}
</script>
