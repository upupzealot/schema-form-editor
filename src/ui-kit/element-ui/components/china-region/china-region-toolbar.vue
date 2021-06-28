<template>
  <el-cascader
    v-model="value"
    :options="options"
    class="example-component"
  />
</template>

<script>
export default {
  type: 'china-region',
  label: '省市区',
  data() {
    return { 
      options: [{
        value: 'zhejiang',
        label: '浙江省',
        children: [{
          value: 'hangzhou',
          label: '杭州市',
          children: [{
            value: 'xihu',
            label: '西湖区',
          }]
        }]
      }],
      value: [
        'zhejiang',
        'hangzhou',
        'xihu',
      ]
    };
  }
}
</script>
