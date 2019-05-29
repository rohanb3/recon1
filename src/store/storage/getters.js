export default {
  getItemById: state => (itemId, tableName, itemKeyName = 'id') => {
    return state[tableName].items.find(item => item[itemKeyName] === itemId);
  },
};
