<template>
  <div class="filter-wrapper">
    <quick-search
      class="quick-search"
      :title="$t('branches.filter.quick.search')"
      :initial-phrase="selectedPhrase"
      @input="handleQuickSearchInput"
    ></quick-search>
  </div>
</template>

<script>
import { APPLY_FILTERS } from "@/store/tables/actionTypes";
import { SEARCH_PHRASE } from "@/constants/filtersNames";
import QuickSearch from "@/components/QuickSearch";

export default {
  name: "QuickSearchBranchesFilter",
  props: {
    tableName: {
      type: String,
      required: true
    }
  },
  components: {
    QuickSearch
  },
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    selectedPhrase() {
      return this.filters[SEARCH_PHRASE] || "";
    }
  },
  methods: {
    handleQuickSearchInput(searchPhrase) {
      const filterName = {
        name: SEARCH_PHRASE,
        value: searchPhrase
      };
      this.applyFilter(filterName);
    },
    applyFilter(...filters) {
      const data = {
        tableName: this.tableName,
        filters
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    }
  }
};
</script>
