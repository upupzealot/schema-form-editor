import Vue from 'vue';
import Vuex from 'vuex';

import FormModule from './form'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    $root: FormModule,
  },
  state: {
    // 当前字段
    activeField: {},
    // 当前（子）表单
    activeForm: {},
  },
  mutations: {
    setActiveField(state, field) {
      state.activeField = field;
    },
    setActiveForm(state, form) {
      state.activeForm = form;
    },
  },
});
