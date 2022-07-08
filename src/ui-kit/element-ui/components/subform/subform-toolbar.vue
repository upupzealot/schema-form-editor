<template>
  <div
    class="example-component"
    :style="{
      border: '1px dashed #eee',
      lineHeight: 0,
      height: '40px',
    }"
  >
    <el-tag
      :size="tagSize"
    >
      子表单
    </el-tag>
  </div>
</template>

<script>
import isVue2 from '../../../common/util-is-vue2';

export default {
  type: 'subform',
  label: '子表单',
  data() {
    return {
      tagSize: isVue2 ? 'mini' : 'small',
    };
  },
}
</script>
