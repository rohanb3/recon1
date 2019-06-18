export default {
  tableData: state => tableName => {
    return state[tableName] || {};
  },
};
