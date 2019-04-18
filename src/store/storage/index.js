import { ORDERS } from "@/constants/entityTypes";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export default {
  state: {
    [ORDERS]: {
      items: [],
      allItemsLoaded: false
    }
  },
  getters,
  actions,
  mutations
};
