import { ENTITY_TYPES, TABLE_NAMES } from '@/constants';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state: {
    [TABLE_NAMES.CLAIMS_ORDERS]: {
      items: [],
      allItemsLoaded: false,
      syncOrdersStatus: null,
    },
    [TABLE_NAMES.DISPUTES_ORDERS]: {
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
    [TABLE_NAMES.CLAIMS_DASHBOARD]: {
      items: [],
      allItemsLoaded: false,
    },
    [TABLE_NAMES.DISPUTES_DASHBOARD]: {
      items: [],
      allItemsLoaded: false,
    },
    [ENTITY_TYPES.DISPUTE_HISTORY]: {
      items: [],
      allItemsLoaded: false,
    },
    [TABLE_NAMES.CLAIMS_DISPUTES]: {
      items: [],
      allItemsLoaded: false,
    },
    [TABLE_NAMES.DISPUTES_LIST]: {
      items: [],
      allItemsLoaded: false,
    },
  },
  getters,
  actions,
  mutations,
};
