import { ENTITY_TYPES, TABLE_NAMES } from '@/constants';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

class TableData {
  constructor() {
    this.items = [];
    this.allItemsLoaded = false;
  }
}

class OrdersTableData extends TableData {
  constructor() {
    super();

    this.syncOrdersStatus = null;
    this.totalCommissions = {
      expectedCommission: null,
      receivedCommission: null,
    };
  }
}

export default {
  state: {
    [TABLE_NAMES.CLAIMS_ORDERS]: new OrdersTableData(),
    [TABLE_NAMES.DISPUTES_ORDERS]: new OrdersTableData(),
    [ENTITY_TYPES.DISPUTES]: new TableData(),
    [TABLE_NAMES.CLAIMS_RESUBMISSION]: new TableData(),
    [TABLE_NAMES.DISPUTES_RESUBMISSION]: {
      items: [],
      allItemsLoaded: false,
    },
    [TABLE_NAMES.CLAIMS_BY_SUBMITTERS]: {
      items: [],
      allItemsLoaded: false,
    },
    [TABLE_NAMES.DISPUTES_BY_SUBMITTERS]: new TableData(),
    [TABLE_NAMES.CLAIMS_DASHBOARD]: new TableData(),
    [TABLE_NAMES.DISPUTES_DASHBOARD]: new TableData(),
    [ENTITY_TYPES.DISPUTE_HISTORY]: new TableData(),
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
