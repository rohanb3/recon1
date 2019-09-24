import { ENTITY_TYPES } from '@/constants';

const { CLAIMS } = ENTITY_TYPES;

export default {
  tabs(state) {
    return state.tabs;
  },
  activeTab(state) {
    return state.active;
  },
  isClaims(state) {
    return state.active === CLAIMS;
  },
};
