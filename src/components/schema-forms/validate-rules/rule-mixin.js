export default {
  computed: {
    // 当前表单和字段
    form() {
      return this.$store.state.activeForm;
    },
    field() {
      return this.$store.state.activeField;
    },
    // 当前字段的所有校验规则
    rules: {
      get() {
        return this.form.validRules[this.field.name] || [];
      },
      set(list) {
        const ruleList = list.length ? list : undefined;
        this.$store.commit(`${this.form.formKey}/setValidRule`, {
          name: this.field.name,
          rules: ruleList,
        });
      }
    },
  }
}
