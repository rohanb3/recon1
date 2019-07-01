import { LOAD_ITEMS } from '@/store/storage/actionTypes';
import * as actionTypes from './actionTypes';
import * as mutationTypes from './mutationTypes';
import { ENTITY_TYPES } from '@/constants';

export default {
  [actionTypes.APPLY_FILTERS](
    { state, commit, dispatch },
    { tableName, filters = [], dataLoading = true }
  ) {
    commit(mutationTypes.SET_FILTERS, { tableName, filters });
    if (dataLoading) {
      const allFilters = state[tableName].filters;
      return dispatch(LOAD_ITEMS, { itemType: tableName, filters: allFilters }).finally(() => {
        commit(mutationTypes.APPLYING_FILTERS_DONE, tableName);
      });
    }
    commit(mutationTypes.APPLYING_FILTERS_DONE, tableName);
    return true;
  },
  [actionTypes.RESET_FILTERS]({ commit, dispatch }, tableName) {
    commit(mutationTypes.RESET_FILTERS, tableName);
    return dispatch(LOAD_ITEMS, { itemType: tableName });
  },
  [actionTypes.RESET_ALL_FILTERS]({ commit }) {
    Object.values(ENTITY_TYPES).forEach(entityName => {
      commit(mutationTypes.RESET_FILTERS, entityName);
    });
  },
};
