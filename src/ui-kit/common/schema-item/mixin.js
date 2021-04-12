import StandardForm from './standard.vue'

export default {
  components: {
    StandardForm,
  },
  computed: {
    field() {
      return this.$store.state.activeField;
    },
  }
}
