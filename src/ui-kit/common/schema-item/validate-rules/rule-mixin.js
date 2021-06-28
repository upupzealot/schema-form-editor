export default {
  computed: {
    // 当前表单和字段
    form() {
      return this.$store.state.activeForm;
    },
    // 当前字段
    field() {
      return this.$store.state.activeField;
    },
    // 预设校验函数
    validFuncs: {
      get() {
        return this.form.validFuncs || [];
      },
      set(list) {
        const funcList = list.length ? list : undefined;
        this.$store.commit(`${this.form.formKey}/setValidFuncs`, funcList);
      }
    },
    // 当前字段的所有校验规则
    rules: {
      get() {
        return this.form.validRules[this.field.name] || [];
      },
      set(list) {
        const ruleList = list.length ? list : undefined;
        this.$store.commit(`${this.form.formKey}/updateValidRules`, {
          name: this.field.name,
          rules: ruleList,
        });
      }
    },
  }
}
