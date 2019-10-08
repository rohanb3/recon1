export default {
  tableData: (state, getters) => tableName => {
    const data = state[tableName] || {};
    const columns = (data.columns || []).filter(
      column => !column.visible || column.visible(state, getters)
    );
    return {
      ...data,
      columns,
    };
  },
};
