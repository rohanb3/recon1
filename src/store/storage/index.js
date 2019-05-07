import { ENTITY_TYPES } from '@/constants';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    [ENTITY_TYPES.ORDERS]: {
      items: [],
      allItemsLoaded: false,
    },
  },
  getters,
  actions,
  mutations,
};
