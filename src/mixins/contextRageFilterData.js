import tableContext from '@/services/tableContext';

export default {
  computed: {
    context() {
      return tableContext(this.tableName);
    },
    fromFilterName() {
      return this.context.from;
    },
    toFilterName() {
      return this.context.to;
    },
    searchFilterName() {
      return this.context.search;
    },
  },
};
