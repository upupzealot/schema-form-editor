import Vuex from 'vuex';

import storeConf from './store'

const store = new Vuex.Store(storeConf);
store.commit('setActiveForm', store.state.$root);

export default store;
