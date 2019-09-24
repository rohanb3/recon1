export default {
  changeTab({ commit, state }, tab) {
    if (state.active !== tab) {
      commit('changeTab', tab);
    }
  },
};
