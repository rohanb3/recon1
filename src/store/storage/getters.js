export default {
  getItemById: state => (itemId, entityName, getItemId) => {
    return state[entityName].items.find(item => getItemId(item) === itemId);
  },
  storageData: state => entityName => {
    return state[entityName] || {};
  },
};
