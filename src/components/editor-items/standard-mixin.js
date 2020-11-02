export default {
  props: {
    supNodes: {
      type: Array,
      default() {
        return null;
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    field: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      vStatus: {}, // virtual status for istance
      statusClasses: {},
    }
  },
  computed: {
    previewStatus() { // status for editor preview
      return {
        activated: this.field.activated !== false && this.vStatus.activated !== false,
        visible: this.field.visible !== false && this.vStatus.visible !== false,
        readonly: this.field.readonly || this.vStatus.readonly,
        disabled: this.field.disabled || this.vStatus.disabled,
      }
    },
  },
  watch: {
    previewStatus: {
      handler() {
        this.$set(this.statusClasses, 'v-not-activated',
          !this.previewStatus.activated || !this.previewStatus.visible);
        this.$set(this.statusClasses, 'v-readonly', this.previewStatus.readonly);
        this.$set(this.statusClasses, 'v-disabled', this.previewStatus.disabled);
      },
      immediate: true,
      deep: true,
    },
  }
}