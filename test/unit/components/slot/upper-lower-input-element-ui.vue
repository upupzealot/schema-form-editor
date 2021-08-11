<template>
  <el-input
    v-model="data[field.name]"
  >
    <template
      v-slot:append
    >
      <el-button class="upper-case-btn">
        ABC
      </el-button>
      <el-button class="lower-case-btn">
        abc
      </el-button>
    </template>
  </el-input>
</template>

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
