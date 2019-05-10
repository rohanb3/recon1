<template>
  <div class="filter-wrapper">
    <quick-search
      class="quick-search"
      :initial-phrase="selectedPhrase"
      @input="handleQuickSearchInput"
    ></quick-search>
  </div>
</template>

<script>
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { FILTER_NAMES } from '@/constants';
import QuickSearch from '@/components/QuickSearch';

export default {
  name: 'QuickSearchBranchesFilter',
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  components: {
    QuickSearch,
  },
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    selectedPhrase() {
      return this.filters[FILTER_NAMES.SEARCH_ORDERS] || '';
    },
  },
  methods: {
    handleQuickSearchInput(searchPhrase) {
      const filterName = {
        name: FILTER_NAMES.SEARCH_ORDERS,
        value: searchPhrase,
      };
      this.applyFilter(filterName);
    },
    applyFilter(...filters) {
      const data = {
        tableName: this.tableName,
        filters,
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    },
  },
};
</script>
