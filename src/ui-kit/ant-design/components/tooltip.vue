<template>
  <span>
    {{ field.label }}
    <a-tooltip
      v-if="hasTooltip"
      placement="top-start"
    >
      <a-icon type="exclamation-circle" />
      <template v-slot:title>
        <span v-html="content" />
      </template>
    </a-tooltip>
  </span>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  computed: {
    hasTooltip() {
      return !!this.field.desc;
    },
    content() {
      return this.field.desc && this.field.desc.replace(/\n/g, '<br>');
    }
  }
}
</script>
