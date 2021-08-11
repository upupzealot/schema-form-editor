<template>
  <a-input
    v-model="data[field.name]"
  >
    <template
      v-slot:append
    >
      <a-button class="upper-case-btn">
        ABC
      </a-button>
      <a-button class="lower-case-btn">
        abc
      </a-button>
    </template>
  </a-input>
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
