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
  },
  mutations: {
    setFormConf(state, formConf) {
      state.formConf = formConf;
    },
    setFieldList(state, fieldList) {
      state.fieldList = fieldList;
    },
    setActiveField(state, field) {
      state.activeField = field;
    },
  },
});
