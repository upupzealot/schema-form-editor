import Vue from 'vue';
import Vuex from 'vuex';

import storeConf from './store'

Vue.use(Vuex);

const store = new Vuex.Store(storeConf);
store.commit('setActiveForm', store.state.$root);

export default store;
