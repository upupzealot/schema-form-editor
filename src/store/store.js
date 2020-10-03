import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formConf: {
      labelWidth: '80px',
      labelPosition: 'right',
      gutter: 20,
    },
    fieldList: [],
    activeField: {},
    validRules: {},
  },
  mutations: {
    setFieldList(state, fieldList) {
      state.fieldList = fieldList;
    },
    setActiveField(state, field) {
      state.activeField = field;
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
});
