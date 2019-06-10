export default {
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    applyingFilters() {
      return this.tableData.applyingFilters;
    },
  },
  mounted() {
    this.loadData(this.filters);
  },
  watch: {
    applyingFilters(newVal) {
      if (newVal) {
        this.loadData(this.filters);
      }
    },
  },
};
