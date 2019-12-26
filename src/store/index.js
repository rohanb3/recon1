import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import storage from './storage';
import tables from './tables';
import uiState from './ui-state';
import loggedInUser from './loggedInUser';

import switcher from './switcher';

Vue.use(Vuex);

const persistedStatePlugin = createPersistedState({
  paths: ['loggedInUser'],
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    storage,
    tables,
    uiState,
    loggedInUser,
    switcher,
  },
  plugins: [persistedStatePlugin],
});
