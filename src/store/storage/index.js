import { ENTITY_TYPES } from '@/constants';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    [ENTITY_TYPES.ORDERS]: {
      items: [],
      allItemsLoaded: false,
      syncOrdersStatus: null,
    },
    [ENTITY_TYPES.DISPUTES]: {
      items: [],
      allItemsLoaded: false,
    },
    [ENTITY_TYPES.RESUBMISSION]: {
      items: [],
      allItemsLoaded: false,
    },
    [ENTITY_TYPES.DISPUTES_BY_SUBMITTERS]: {
      items: [],
      allItemsLoaded: false,
    },
    [ENTITY_TYPES.DISPUTES_DASHBOARD]: {
      items: [],
      allItemsLoaded: false,
    },
    [ENTITY_TYPES.DISPUTES_DASHBOARD]: {
      items: [],
      allItemsLoaded: false,
    },
    [ENTITY_TYPES.DISPUTE_HISTORY]: {
      items: [],
      allItemsLoaded: false,
    },
  },
  getters,
  actions,
  mutations,
};
