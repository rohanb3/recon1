import { getEntityActions } from './repositoryHelper';

import {
  LOAD_ITEMS,
  LOAD_MORE_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SYNC_ORDERS,
  START_SYNC_ORDERS,
  POLLING_ORDER_SYNC,
} from './actionTypes';

import {
  INSERT_ITEMS,
  CHANGE_ITEM,
  REMOVE_ITEM,
  SET_ALL_ITEMS_LOADED,
  SET_ITEMS_TOTAL,
  RESET_ITEMS,
  SET_SYNC_ORDERS_STATUS,
} from './mutationTypes';

import { ITEMS_TO_LOAD } from './constants';

import { ORDER_SYNC_STATUS, ENTITY_TYPES } from '@/constants';

import { orderSync, checkOrderSync } from '@/services/ordersRepository';

import moment from 'moment';

import config from '@/../config.json';

const LAST_SIX_MONTHS = 6;

let syncOrdersIntervalId = null;

async function loadItems({ commit, state }, { itemType, filters = {} }, resetPrevious) {
  const { items } = state[itemType];
  const filtersToApply = {
    ...filters,
    skip: resetPrevious ? 0 : items.length,
    take: ITEMS_TO_LOAD,
  };

  const { getAll } = getEntityActions(itemType);
  const { data, total } = await getAll(filtersToApply);

  if (resetPrevious) {
    commit(RESET_ITEMS, itemType);
  }

  commit(INSERT_ITEMS, { itemType, items: data });
  commit(SET_ITEMS_TOTAL, { itemType, total });

  if (data.length < ITEMS_TO_LOAD) {
    commit(SET_ALL_ITEMS_LOADED, itemType);
  }
}

export default {
  [LOAD_ITEMS](store, data) {
    return loadItems(store, data, true);
  },
  [LOAD_MORE_ITEMS](store, data) {
    return loadItems(store, data, false);
  },
  async [CREATE_ITEM]({ commit }, { itemType, ...data }) {
    const { create } = getEntityActions(itemType);
    const createdItem = await create(data);
    commit(INSERT_ITEMS, { itemType, items: [{ ...createdItem, _new: true }] });
  },
  async [UPDATE_ITEM]({ commit }, { itemType, id, ...updates }) {
    const { update } = getEntityActions(itemType);
    await update(id, updates);
    commit(CHANGE_ITEM, { itemType, id, ...updates });
  },
  async [DELETE_ITEM]({ commit }, { itemType, id }) {
    const { delete: deleteItem } = getEntityActions(itemType);
    await deleteItem(id);
    commit(REMOVE_ITEM, { itemType, id });
  },
  async [SYNC_ORDERS]({ commit, dispatch }, dateRange) {
    commit(SET_SYNC_ORDERS_STATUS, ORDER_SYNC_STATUS.WORKING);
    try {
      if (!syncOrdersIntervalId) {
        const taskId = await orderSync(dateRange);
        syncOrdersIntervalId = setInterval(() => {
          dispatch(POLLING_ORDER_SYNC, taskId);
        }, config.orderSyncPollingTimeout);
      }
    } catch {
      commit(SET_SYNC_ORDERS_STATUS, ORDER_SYNC_STATUS.ERROR);
    }
  },
  async [START_SYNC_ORDERS]({ dispatch }) {
    dispatch(SYNC_ORDERS, {
      syncOrderFromDate: moment
        .utc()
        .subtract(LAST_SIX_MONTHS, 'month')
        .startOf('day')
        .format(),
      syncOrderToDate: moment
        .utc()
        .endOf('day')
        .format(),
    });
  },
  async [POLLING_ORDER_SYNC]({ commit, dispatch, rootState }, taskId) {
    try {
      const status = await checkOrderSync(taskId);
      if (status === ORDER_SYNC_STATUS.FINISHED) {
        clearInterval(syncOrdersIntervalId);
        await dispatch(LOAD_ITEMS, {
          itemType: ENTITY_TYPES.ORDERS,
          filters: rootState.tables[ENTITY_TYPES.ORDERS].filters,
        });
        commit(SET_SYNC_ORDERS_STATUS, ORDER_SYNC_STATUS.FINISHED);
      }
    } catch {
      clearInterval(syncOrdersIntervalId);
      commit(SET_SYNC_ORDERS_STATUS, ORDER_SYNC_STATUS.ERROR);
    }
  },
};
