<template>
  <!-- <el-input
    v-model="value"
    type="textarea"
    :rows="2"
    :autosize="{ minRows: 2, maxRows: 2}"
    placeholder="请输入"
    class="example-component"
  /> -->
  <el-button class="example-component">
    <i
      v-if="isVue2"
      class="el-icon-map-location"
    />
    <MapLocation v-else />
    地图选点
  </el-button>
</template>

<script>
import isVue2 from '../../../common/util-is-vue2'

export default {
  type: 'china-location',
  label: '地理坐标',
  data() {
    return { value: '杭州市民中心\r\n解放东路18号', isVue2 };
  }
}
</script>
