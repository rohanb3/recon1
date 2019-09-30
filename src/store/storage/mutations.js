import Vue from 'vue';
import {
  INSERT_ITEMS,
  CHANGE_ITEM,
  REMOVE_ITEM,
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
  SET_ITEMS_TOTAL,
  SET_SYNC_ORDERS_STATUS,
} from './mutationTypes';

import { TABLE_NAMES } from '@/constants';

export default {
  /* eslint-disable no-param-reassign */
  [INSERT_ITEMS](state, { itemType, items }) {
    state[itemType].items.push(...items);
  },
  [CHANGE_ITEM](state, { itemType, id, ...updates }) {
    const itemIndex = state[itemType].items.findIndex(template => template.id === id);
    if (itemIndex >= 0) {
      const updated = Object.assign({}, state[itemType].items[itemIndex], updates);
      Vue.set(state[itemType].items, itemIndex, updated);
    }
  },
  [REMOVE_ITEM](state, { itemType, id }) {
    const itemIndex = state[itemType].items.findIndex(template => template.id === id);
    if (itemIndex >= 0) {
      Vue.delete(state[itemType].items, itemIndex);
    }
  },
  [RESET_ITEMS](state, itemType) {
    state[itemType].items = [];
    state[itemType].allItemsLoaded = false;
  },
  [SET_ALL_ITEMS_LOADED](state, itemType) {
    state[itemType].allItemsLoaded = true;
  },
  [SET_ITEMS_TOTAL](state, { itemType, total = 0 }) {
    state[itemType].total = total;
  },
  [SET_SYNC_ORDERS_STATUS](state, status) {
    state[TABLE_NAMES.CLAIMS_ORDERS].syncOrdersStatus = status;
  },
  /* eslint-enable no-param-reassign */
};
