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
  computed: {
    status() {
      return {
        activated: this.field.activated !== false,
        visible: this.field.visible !== false,
        readonly: this.field.readonly,
        disabled: this.field.disabled,
      }
    }
  }
}