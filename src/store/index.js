import Vue from 'vue';
import Vuex from 'vuex';

import storage from './storage';
import tables from './tables';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    storage,
    tables,
  },
});
