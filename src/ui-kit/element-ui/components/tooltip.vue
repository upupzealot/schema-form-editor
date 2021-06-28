<template>
  <span>
    {{ field.label }}
    <el-tooltip
      v-if="hasTooltip"
      placement="top-start"
    >
      <i
        v-if="hasTooltip"
        class="el-icon-warning-outline"
      />
      <template v-slot:content>
        <span v-html="content" />
      </template>
    </el-tooltip>
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
