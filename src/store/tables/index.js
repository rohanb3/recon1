import {
  getClaimsOrdersTableColumns,
  getDisputesTableColumns,
  getResubmissionTableColumns,
  getDisputesBySubmittersColumns,
  getDisputeHistoryTableColumns,
  getDisputesOrdersTableColumns,
  getClaimsDisputesTableColumns,
} from '@/services/tablesColumnsList';
import { ENTITY_TYPES, TABLE_NAMES } from '@/constants';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import getDefaultFilters from './filtersHelper';

const state = {
  [TABLE_NAMES.CLAIMS_ORDERS]: {
    columns: getClaimsOrdersTableColumns(),
    filters: getDefaultFilters(TABLE_NAMES.CLAIMS_ORDERS),
    applyingFilters: false,
  },
  [TABLE_NAMES.DISPUTES_ORDERS]: {
    columns: getDisputesOrdersTableColumns(),
    filters: getDefaultFilters(TABLE_NAMES.DISPUTES_ORDERS),
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
  [TABLE_NAMES.CLAIMS_DASHBOARD]: {
    filters: getDefaultFilters(TABLE_NAMES.CLAIMS_DASHBOARD),
    applyingFilters: false,
  },
  [TABLE_NAMES.DISPUTES_DASHBOARD]: {
    filters: getDefaultFilters(TABLE_NAMES.DISPUTES_DASHBOARD),
    applyingFilters: false,
  },
  [ENTITY_TYPES.DISPUTE_HISTORY]: {
    columns: getDisputeHistoryTableColumns(),
    filters: getDefaultFilters(ENTITY_TYPES.DISPUTE_HISTORY),
    applyingFilters: true,
  },
  [TABLE_NAMES.CLAIMS_DISPUTES]: {
    columns: getClaimsDisputesTableColumns(),
    filters: getDefaultFilters(TABLE_NAMES.CLAIMS_DISPUTES),
    applyingFilters: false,
  },
  [TABLE_NAMES.DISPUTES_LIST]: {
    columns: getDisputesTableColumns(),
    filters: getDefaultFilters(TABLE_NAMES.DISPUTES_LIST),
    applyingFilters: false,
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
