import { mapGetters } from 'vuex';
import { RESET_ITEMS } from '@/store/storage/mutationTypes';
import { LOAD_ITEMS, LOAD_MORE_ITEMS } from '@/store/storage/actionTypes';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { RESET_FILTERS } from '@/store/tables/mutationTypes';
import { FILTER_NAMES, SORTING_DIRECTION } from '@/constants';

export default {
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    if (this.initialLoad) {
      const filters = Object.entries(this.$route.params).map(([name, value]) => ({ name, value }));
      this.applyFilters(...filters);
    }
  },
  beforeDestroy() {
    if (this.resetDataBeforeLeave) {
      this.resetItems();
      this.resetFilters();
    }
  },
  computed: {
    ...mapGetters(['storageData', 'tableData']),
    allItemsLoaded() {
      return this.storageData(this.tableName).allItemsLoaded;
    },
    totalItems() {
      return this.storageData(this.tableName).total;
    },
    filters() {
      return this.tableData(this.tableName).filters || {};
    },
    sortingField() {
      return this.filters[FILTER_NAMES.SORT];
    },
    sortDirection() {
      return this.filters[FILTER_NAMES.ORDER];
    },
    role() {
      return this.$store.getters.role;
    },
    applyingFilters() {
      return Boolean(this.tableData(this.tableName).applyingFilters);
    },
    tableRows() {
      if (this.isContainRows) return this.rows;
      return this.storageData(this.tableName).items || [];
    },
    isContainRows() {
      return this.rows && this.rows.length;
    },
    tableColumns() {
      if (this.isContainColumns) return this.columns;
      return this.tableData(this.tableName).columns;
    },
    isContainColumns() {
      return this.columns && this.columns.length;
    },
    tableNameLowerCase() {
      return this.tableName.toLowerCase();
    },
  },
  methods: {
    checkAndLoadItems() {
      if (!this.allItemsLoaded) {
        this.loadMoreItems();
      }
    },
    loadItems() {
      this.loading = true;
      const data = { itemType: this.tableName, filters: this.filters };
      return this.$store.dispatch(LOAD_ITEMS, data).finally(() => {
        this.loading = false;
      });
    },
    loadMoreItems() {
      this.loading = true;
      const data = { itemType: this.tableName, filters: this.filters };
      return this.$store.dispatch(LOAD_MORE_ITEMS, data).finally(() => {
        this.loading = false;
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
        asc: { order: SORTING_DIRECTION.DESC, sort: sortingFieldName },
        desc: { order: null, sort: null },
        null: { order: SORTING_DIRECTION.ASC, sort: sortingFieldName },
      };

      const order = {
        name: FILTER_NAMES.ORDER,
        value: state[this.sortDirection].order,
      };

      const sort = {
        name: FILTER_NAMES.SORT,
        value: state[this.sortDirection].sort,
      };

      if (sortingFieldName !== this.sortingField) {
        sort.value = sortingFieldName;
        order.value = SORTING_DIRECTION.ASC;
      }

      if (sortingFieldName !== this.sortingField || state[this.sortDirection].order === null) {
        this.applyFilters(sort, order);
      } else {
        this.applyFilters(order);
      }
    },
  },
};
