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

class TableDataWithCommission extends TableData {
  constructor() {
    super();

    this.totalCommissions = {
      expectedCommission: null,
      receivedCommission: null,
    };
  }
}

class OrdersTableData extends TableDataWithCommission {
  constructor() {
    super();

    this.syncOrdersStatus = null;
  }
}

export default {
  state: {
    [TABLE_NAMES.CLAIMS_ORDERS]: new OrdersTableData(),
    [TABLE_NAMES.DISPUTES_ORDERS]: new OrdersTableData(),
    [ENTITY_TYPES.DISPUTES]: new TableData(),
    [TABLE_NAMES.CLAIMS_RESUBMISSION]: new TableDataWithCommission(),
    [TABLE_NAMES.DISPUTES_RESUBMISSION]: new TableDataWithCommission(),
    [TABLE_NAMES.CLAIMS_BY_SUBMITTERS]: new TableData(),
    [TABLE_NAMES.DISPUTES_BY_SUBMITTERS]: new TableData(),
    [TABLE_NAMES.CLAIMS_DASHBOARD]: new TableData(),
    [TABLE_NAMES.DISPUTES_DASHBOARD]: new TableData(),
    [ENTITY_TYPES.DISPUTE_HISTORY]: new TableData(),
    [TABLE_NAMES.CLAIMS_DISPUTES]: new TableDataWithCommission(),
    [TABLE_NAMES.DISPUTES_LIST]: new TableDataWithCommission(),
    [TABLE_NAMES.RECEIVED_COMMISSION]: new TableData(),
  },
  getters,
  actions,
  mutations,
};
