export default {
  namespaced: true,
  state() {
    return {
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
    setFieldList(state, fieldList) {
      state.fieldList = fieldList;
    },
    setValidRule(state, {name, rules}) {
      const diff = {};
      diff[name] = rules;

      state.validRules = {
        ...state.validRules,
        ...diff,
      };
    }
  },
}
