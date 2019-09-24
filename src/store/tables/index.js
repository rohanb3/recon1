import {
  getClaimsOrdersTableColumns,
  getDisputesTableColumns,
  getResubmissionTableColumns,
  getDisputesBySubmittersColumns,
  getDisputeHistoryTableColumns,
  getDisputesOrdersTableColumns,
} from '@/services/tablesColumnsList';
import { ENTITY_TYPES } from '@/constants';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import getDefaultFilters from './filtersHelper';

const state = {
  [ENTITY_TYPES.CLAIMS_ORDERS]: {
    columns: getClaimsOrdersTableColumns(),
    filters: getDefaultFilters(ENTITY_TYPES.CLAIMS_ORDERS),
    applyingFilters: false,
  },
  [ENTITY_TYPES.DISPUTES_ORDERS]: {
    columns: getDisputesOrdersTableColumns(),
    filters: getDefaultFilters(ENTITY_TYPES.DISPUTES_ORDERS),
    applyingFilters: false,
  },
  [ENTITY_TYPES.DISPUTES]: {
    columns: getDisputesTableColumns(),
    filters: getDefaultFilters(ENTITY_TYPES.DISPUTES),
    applyingFilters: false,
  },
  [ENTITY_TYPES.RESUBMISSION]: {
    columns: getResubmissionTableColumns(),
    filters: getDefaultFilters(ENTITY_TYPES.RESUBMISSION),
    applyingFilters: false,
  },
  [ENTITY_TYPES.DISPUTES_BY_SUBMITTERS]: {
    columns: getDisputesBySubmittersColumns(),
    filters: getDefaultFilters(ENTITY_TYPES.DISPUTES_BY_SUBMITTERS),
    applyingFilters: false,
  },
  [ENTITY_TYPES.DISPUTES_DASHBOARD]: {
    filters: getDefaultFilters(ENTITY_TYPES.DISPUTES_DASHBOARD),
    applyingFilters: false,
  },
  [ENTITY_TYPES.DISPUTE_HISTORY]: {
    columns: getDisputeHistoryTableColumns(),
    filters: getDefaultFilters(ENTITY_TYPES.DISPUTE_HISTORY),
    applyingFilters: true,
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
