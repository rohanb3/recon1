import { getEntityActions } from './repositoryHelper';
import { SET_RECEIVED_COMMISSION_DATA } from './mutationTypes';

class CommissionLoader {
  constructor() {
    this.result = {};
  }

  async loadItems({ commit }, { itemType, id }) {
    const { getAll } = getEntityActions(itemType);

    this.result = id ? await getAll(id) : [];

    commit(SET_RECEIVED_COMMISSION_DATA, { itemType, data: this.result, allItemsLoaded: true });
  }
}

export default CommissionLoader;
