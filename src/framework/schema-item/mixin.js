import StandardForm from './standard.vue'

export default {
  components: {
    StandardForm,
  },
  props: {
    uiKit: {
      type: String,
      default() {
        return 'element-ui';
      },
    }
  },
  computed: {
    field() {
      return this.$store.state.activeField;
    },
  }
}
