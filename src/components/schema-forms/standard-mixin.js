import StandardForm from './standard'

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
