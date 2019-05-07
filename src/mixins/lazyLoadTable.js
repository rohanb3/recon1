import { RESET_ITEMS } from '@/store/storage/mutationTypes';
import { LOAD_ITEMS, LOAD_MORE_ITEMS } from '@/store/storage/actionTypes';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { RESET_FILTERS } from '@/store/tables/mutationTypes';
import { ORDER, SORT } from '@/constants/filtersNames';
import { ORDER_BY_DESC, ORDER_BY_ASC } from '@/constants/sortingDirection';

export default {
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.loadItems();
  },
  beforeDestroy() {
    this.resetItems();
    this.resetFilters();
  },
  computed: {
    storageData() {
      return this.$store.state.storage[this.tableName] || {};
    },
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    rows() {
      return this.storageData.items || [];
    },
    allItemsLoaded() {
      return this.storageData.allItemsLoaded;
    },
    totalItems() {
      return this.storageData.total;
    },
    filters() {
      return this.tableData.filters || {};
    },
    sortingField() {
      return this.filters[SORT];
    },
    sortDirection() {
      return this.filters[ORDER];
    },
    role() {
      return this.$store.getters.role;
    },
    applyingFilters() {
      return Boolean(this.tableData.applyingFilters);
    },
    usersDashboardStatistics() {
      return this.storageData.usersDashboardStatistics || {};
    },
  },
  methods: {
    checkAndLoadItems(stateChanger) {
      if (!this.allItemsLoaded) {
        this.loadMoreItems(stateChanger);
      }
    },
    loadItems() {
      this.loading = true;
      const data = { itemType: this.tableName, filters: this.filters };
      return this.$store.dispatch(LOAD_ITEMS, data).finally(() => {
        this.loading = false;
      });
    },
    loadMoreItems(stateChanger) {
      this.loading = true;
      const data = { itemType: this.tableName, filters: this.filters };
      return this.$store.dispatch(LOAD_MORE_ITEMS, data).finally(() => {
        this.loading = false;
        stateChanger.reset();
      });
    },
    resetItems() {
      this.$store.commit(RESET_ITEMS, this.tableName);
    },
    applyFilters(...filters) {
      const data = {
        tableName: this.tableName,
        filters,
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    },
    resetFilters() {
      this.$store.commit(RESET_FILTERS, this.tableName);
    },
    onSortDirectionChanged(sortingFieldName) {
      const state = {
        asc: { order: ORDER_BY_DESC, sort: sortingFieldName },
        desc: { order: null, sort: null },
        null: { order: ORDER_BY_ASC, sort: sortingFieldName },
      };

      const order = {
        name: ORDER,
        value: state[this.sortDirection].order,
      };

      const sort = {
        name: SORT,
        value: state[this.sortDirection].sort,
      };

      if (sortingFieldName !== this.sortingField) {
        sort.value = sortingFieldName;
        order.value = ORDER_BY_ASC;
      }

      if (sortingFieldName !== this.sortingField || state[this.sortDirection].order === null) {
        this.applyFilters(sort, order);
      } else {
        this.applyFilters(order);
      }
    },
    onFiltersApplied(arrayFilters) {
      this.applyFilters(...arrayFilters);
    },
  },
};
