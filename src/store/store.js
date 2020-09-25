import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fieldList: [],
    activeField: {},
  },
  mutations: {
    fieldListChange(state, fieldList) {
      state.fieldList = fieldList;
    },
    setActiveField(state, field) {
      state.activeField = field;
    },
  },
});
