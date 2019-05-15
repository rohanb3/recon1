import * as types from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [types.SET_TINY_SIDEBAR_STATUS](state, status) {
    state.tinySidebarStatus = status;
  },
  /* eslint-enable no-param-reassign */
};
