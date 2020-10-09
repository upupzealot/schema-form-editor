export default {
  computed: {
    // 当前字段
    field() {
      return this.$store.state.activeField;
    },
    // 当前字段的所有校验规则
    rules: {
      get() {
        return this.$store.state.$root.validRules[this.field.name] || [];
      },
      set(list) {
        const ruleList = list.length ? list : undefined;
        this.$store.commit('$root/setValidRule', {
          name: this.field.name,
          rules: ruleList,
        });
      }
    },
  }
}
