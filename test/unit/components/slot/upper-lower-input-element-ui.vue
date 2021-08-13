<template>
  <el-input
    v-model="data[field.name]"
  >
    <template
      v-slot:append
    >
      <el-button
        class="upper-case-btn"
        style="
          border-right: 1px solid #dcdfe6;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;"
        @click="toUpperCase({ field, data })"
      >
        ABC
      </el-button>
      <el-button
        class="lower-case-btn"
        @click="toLowerCase({ field, data })"
      >
        abc
      </el-button>
    </template>
  </el-input>
</template>

<style scoped>
.upper-case-btn,
.lower-case-btn {
  margin-left: 0;
  margin-right: 0;
}
.upper-case-btn {
  margin-left: -20px;
}
.lower-case-btn {
  margin-right: -20px;
}
</style>

<script>
import upperLowerInputMixin from './upper-lower-input-mixin'

export default {
  mixins: [upperLowerInputMixin],
}
</script>
