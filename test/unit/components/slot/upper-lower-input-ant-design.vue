<template>
  <a-input
    v-model="data[field.name]"
    v-model:value="data[field.name]"
  >
    <template
      v-slot:addonAfter
    >
      <div
        class="upper-case-btn"
        style="
          border-right: 1px solid #d9d9d9;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;"
        @click="toUpperCase({ field, data })"
      >
        ABC
      </div>
      <div
        class="lower-case-btn"
        @click="toLowerCase({ field, data })"
      >
        abc
      </div>
    </template>
  </a-input>
</template>

<style scoped>
.upper-case-btn {
  margin-left: -11px;
}
.lower-case-btn {
  margin-right: -11px;
}
.upper-case-btn,
.lower-case-btn {
  display: inline-block;
  padding: 0 11px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
</style>

<script>
import upperLowerInputMixin from './upper-lower-input-mixin'

export default {
  mixins: [upperLowerInputMixin],
}
</script>
