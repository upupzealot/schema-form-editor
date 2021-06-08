<template>
  <component
    :is="inline ? 'span' : 'el-col'"
    :span="field.span"
    :style="{ marginBottom: colMarginY }"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default() {
        return false;
      }
    },
    formConf: {
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
    }
  },
  computed: {
    marginY() {
      return this.formConf.marginY || 15;
    },
    colMarginY() {
      if(this.field.activated === false || this.field.visible === false) {
        return '0';
      } else if(this.field.type === 'wrapper' || this.field.type === 'subform' ) {
        return `${this.marginY - (field.formConf.marginY || 15)}px`;
      } else {
        return `${this.marginY}px`;
      }
    },
  }
}
</script>
