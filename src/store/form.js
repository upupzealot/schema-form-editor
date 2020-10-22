export default {
  namespaced: true,
  state() {
    return {
      formKey: '$root',
      formConf: {
        labelWidth: '80px',
        labelPosition: 'right',
        gutter: 20,
      },
      fieldList: [],
      validRules: {},
    }
  },
  mutations: {
    setFormKey(state, formKey) {
      state.formKey = formKey;
    },
    setFieldList(state, fieldList) {
      state.fieldList = fieldList;
    },
    setValidRules(state, {name, rules}) {
      const diff = {};
      diff[name] = rules;

      state.validRules = {
        ...state.validRules,
        ...diff,
      };
    }
  },
}
