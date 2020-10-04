export default {
  computed: {
    field() {
      return this.$store.state.activeField;
    },
    rules: {
      get() {
        return this.$store.state.validRules[this.field.name] || [];
      },
      set(list) {
        const ruleList = list.length ? list : undefined;
        this.$store.commit('setValidRule', {
          name: this.field.name,
          rules: ruleList,
        });
      }
    },
  }
}
