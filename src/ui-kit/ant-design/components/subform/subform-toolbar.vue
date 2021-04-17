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
      子表单
    </el-tag>
  </div>
</template>

<script>
export default {
  type: 'subform',
  label: '子表单',
}
</script>
