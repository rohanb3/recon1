import { ITEMS_TO_LOAD } from './constants';
import { getEntityActions } from './repositoryHelper';
import {
  INSERT_ITEMS,
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
  SET_COMMISSIONS,
  SET_ITEMS_TOTAL,
} from './mutationTypes';
import { getObjectFromArrayByKey } from '@/services/transformer';

class ItemsLoader {
  constructor() {
    this.result = null;
  }

  async loadItems({ commit, state }, { itemType, filters = {} }, reset) {
    const { items } = state[itemType];

    const filtersToApply = {
      ...filters,
      skip: reset ? 0 : items.length,
      take: ITEMS_TO_LOAD,
    };

    const { getAll } = getEntityActions(itemType);

    this.result = await getAll(filtersToApply);

    if (reset) {
      this.resetPrevious(commit, itemType);
    }

    this.setItems(commit, itemType);
  }

  setItems(commit, itemType) {
    const data = this.getDataFromResult();

    commit(INSERT_ITEMS, { itemType, items: data });

    commit(SET_ITEMS_TOTAL, { itemType, total: this.result.total });
    if (data.length < ITEMS_TO_LOAD) {
      commit(SET_ALL_ITEMS_LOADED, itemType);
    }
  }

  getDataFromResult() {
    return this.result.data;
  }

  // eslint-disable-next-line
  resetPrevious(commit, itemType) {
    commit(RESET_ITEMS, itemType);
  }
}

class ItemsLoaderWithCommission extends ItemsLoader {
  async loadItems({ commit, state }, { itemType, filters = {} }, resetPrevious) {
    await super.loadItems({ commit, state }, { itemType, filters }, resetPrevious);

    if (this.result.totalSum) {
      this.setCommission(commit, itemType, this.result);
    }
  }

  // eslint-disable-next-line
  setCommission(commit, itemType, { totalSum }) {
    const totalCommissions = totalSum ? getObjectFromArrayByKey(totalSum) : null;

    if (totalCommissions) {
      commit(SET_COMMISSIONS, { itemType, totalCommissions });
    }
  }
}

export { ItemsLoader, ItemsLoaderWithCommission };
