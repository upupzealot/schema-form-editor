<template>
  <!-- <el-input
    v-model="value"
    type="textarea"
    :rows="2"
    :autosize="{ minRows: 2, maxRows: 2}"
    placeholder="请输入"
    class="example-component"
  /> -->
  <el-button>
    <i class="el-icon-map-location" />
    地图选点
  </el-button>
</template>

<script>
export default {
  type: 'china-location',
  label: '地理坐标',
  data() {
    return { value: '杭州市民中心\r\n解放东路18号' };
  }
}
</script>
