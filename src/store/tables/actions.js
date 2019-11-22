import intersection from 'lodash.intersection';
import { LOAD_ITEMS } from '@/store/storage/actionTypes';
import * as actionTypes from './actionTypes';
import * as mutationTypes from './mutationTypes';
import { RESET_ITEMS, SET_ALL_ITEMS_LOADED } from '@/store/storage/mutationTypes';
import { TABLE_NAMES } from '@/constants';

export default {
  [actionTypes.APPLY_FILTERS]({ state, commit, dispatch }, { tableName, filters = [] }) {
    commit(mutationTypes.SET_FILTERS, { tableName, filters });
    const allFilters = state[tableName].filters;
    return dispatch(LOAD_ITEMS, { itemType: tableName, filters: allFilters }).finally(() => {
      commit(mutationTypes.APPLYING_FILTERS_DONE, tableName);
    });
  },
  [actionTypes.APPLY_DISPUTE_STATUS_FILTER](
    { state, commit, dispatch },
    { tableName, dependentFilterName, selectedFilter, filterField }
  ) {
    let dataLoading = true;
    let disputeStatusIds = [];

    const dependentFilter = state[tableName].filters[dependentFilterName] || [];

    if (dependentFilter.length && selectedFilter.value.length) {
      disputeStatusIds = intersection(dependentFilter, selectedFilter.value);
      dataLoading = disputeStatusIds.length > 0;
    } else {
      disputeStatusIds = dependentFilter.length ? dependentFilter : selectedFilter.value;
    }

    const disputeStatusFilters = [
      {
        name: filterField,
        value: disputeStatusIds,
      },
    ].concat(selectedFilter);

    commit(mutationTypes.SET_FILTERS, { tableName, filters: disputeStatusFilters });

    if (dataLoading) {
      const allFilters = state[tableName].filters;
      dispatch(LOAD_ITEMS, { itemType: tableName, filters: allFilters }).finally(() => {
        commit(mutationTypes.APPLYING_FILTERS_DONE, tableName);
      });
    } else {
      commit(RESET_ITEMS, tableName);
      commit(SET_ALL_ITEMS_LOADED, tableName);
      commit(mutationTypes.APPLYING_FILTERS_DONE, tableName);
    }
  },
  [actionTypes.RESET_FILTERS]({ commit, dispatch }, tableName) {
    commit(mutationTypes.RESET_FILTERS, tableName);
    return dispatch(LOAD_ITEMS, { itemType: tableName }).finally(() => {
      commit(mutationTypes.APPLYING_FILTERS_DONE, tableName);
    });
  },
  [actionTypes.RESET_ALL_FILTERS]({ commit }) {
    Object.values(TABLE_NAMES).forEach(entityName => {
      commit(mutationTypes.RESET_FILTERS, entityName);
    });
  },
};
