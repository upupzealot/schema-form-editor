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
      >
        ABC
      </el-button>
      <el-button class="lower-case-btn">
        abc
      </el-button>
    </template>
  </el-input>
</template>

<style>
.form-item .upper-case-btn {
  border-right: 1px solid #dcdfe6;
}
</style>

<script>
export default {
  props: {
    schema: {
      type: Object,
      default() {
        return {};
      }
    },
    field: {
      type: Object,
      default() {
        return {};
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>
