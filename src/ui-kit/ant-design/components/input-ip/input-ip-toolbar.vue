<template>
  <div style="display: flex;">
    <a-input
      v-model="value[0]"
      v-model:value="value[0]"
      class="example-component ip-input"
    />.
    <a-input
      v-model="value[1]"
      v-model:value="value[1]"
      class="example-component ip-input"
    />.
    <a-input
      v-model="value[2]"
      v-model:value="value[2]"
      class="example-component ip-input"
    />.
    <a-input
      v-model="value[3]"
      v-model:value="value[3]"
      class="example-component ip-input"
    />
  </div>
</template>

<style scoped>
.item-bar .example-component.ip-input {
  margin-left: 2.5px;
  margin-right: 2.5px;
  padding: 4px;
  text-align: center;
}
.item-bar .example-component.ip-input:first-of-type {
  margin-left: 0;
}
.item-bar .example-component.ip-input:last-of-type {
  margin-right: 0;
}
</style>
<style>
.item-bar .example-component.ip-input .el-input__inner {
  padding: 0 5px;
  text-align: center;
}
</style>

<script>
export default {
  type: 'input-ip',
  label: 'IP 框',
  data() {
    return { value: ['192', '168', '0', '1'] };
  }
}
</script>
