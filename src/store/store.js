import Vue from 'vue';
import Vuex from 'vuex';

import FormModule from './form'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    $root: FormModule,
  },
  state: {
    projectId: localStorage.getItem('projectId') || 'default',
    itemBarPosition: 'left',
    // 当前字段
    activeField: {},
    // 当前（子）表单
    activeForm: null, // 后续初始化为 $root
  },
  mutations: {
    setProjectId(state, projectId) {
      state.projectId = projectId;
    },
    setItemBarPosition(state, position) {
      state.itemBarPosition = position;
    },
    setActiveField(state, field) {
      state.activeField = field;
    },
    setActiveForm(state, form) {
      state.activeForm = form;
    },
  },
});
store.commit('setActiveForm', store.state.$root);

export default store;
