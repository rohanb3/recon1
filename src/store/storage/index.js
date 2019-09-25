import { ENTITY_TYPES } from '@/constants';
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
    [ENTITY_TYPES.CLAIMS_ORDERS]: new OrdersTableData(),
    [ENTITY_TYPES.DISPUTES_ORDERS]: new OrdersTableData(),
    [ENTITY_TYPES.DISPUTES]: new TableData(),
    [ENTITY_TYPES.RESUBMISSION]: new TableData(),
    [ENTITY_TYPES.DISPUTES_BY_SUBMITTERS]: new TableData(),
    [ENTITY_TYPES.DISPUTES_DASHBOARD]: new TableData(),
    [ENTITY_TYPES.DISPUTES_DASHBOARD]: new TableData(),
    [ENTITY_TYPES.DISPUTE_HISTORY]: new TableData(),
  },
  getters,
  actions,
  mutations,
};
