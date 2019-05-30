export default {
  getItemById: state => (itemId, tableName, getItemId) => {
    return state[tableName].items.find(item => getItemId(item) === itemId);
  },
};
