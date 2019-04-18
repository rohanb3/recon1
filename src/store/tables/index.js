import { getOrdersTableColumns } from "@/services/tablesColumnsList";
import { ORDERS } from "@/constants/entityTypes";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import getDefaultFilters from "./filtersHelper";

const state = {
  [ORDERS]: {
    columns: getOrdersTableColumns(),
    filters: getDefaultFilters(ORDERS),
    applyingFilters: false
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
