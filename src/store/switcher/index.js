import { CLAIMS, DISPUTES } from '../../constants';

const state = {
  active: CLAIMS,
  tabs: [CLAIMS, DISPUTES],
};

const getters = {
  tabs() {
    return state.tabs;
  },
  activeTab() {
    return state.active;
  },
};

const actions = {
  changeTab({ commit }, tab) {
    commit('changeTab', tab);
  },
};

const mutations = {
  changeTab(store, tab) {
    // eslint-disable-next-line
    store.active = tab;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
