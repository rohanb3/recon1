import { getOrdersTableColumns, getDisputesTableColumns } from '@/services/tablesColumnsList';
import { ENTITY_TYPES } from '@/constants';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import getDefaultFilters from './filtersHelper';

const state = {
  [ENTITY_TYPES.ORDERS]: {
    columns: getOrdersTableColumns(),
    filters: getDefaultFilters(ENTITY_TYPES.ORDERS),
    applyingFilters: false,
  },
  [ENTITY_TYPES.DISPUTES]: {
    columns: getDisputesTableColumns(),
    filters: getDefaultFilters(ENTITY_TYPES.DISPUTES),
    applyingFilters: false,
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
