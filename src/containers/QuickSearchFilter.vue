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
import debounce from 'lodash.debounce';
import { mapGetters } from 'vuex';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import QuickSearch from '@/components/QuickSearch';
import contextRageFilterData from '@/mixins/contextRageFilterData';

const SEARCH_TIMEOUT = 500;

export default {
  name: 'QuickSearchFilter',
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  mixins: [contextRageFilterData],
  components: {
    QuickSearch,
  },
  computed: {
    ...mapGetters(['tableData']),
    filters() {
      return this.tableData(this.tableName).filters;
    },
    selectedPhrase() {
      return this.filters[this.searchFilterName] || '';
    },
  },
  methods: {
    handleQuickSearchInput: debounce(function onInput(searchPhrase) {
      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: this.searchFilterName,
            value: searchPhrase,
          },
        ],
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    }, SEARCH_TIMEOUT),
  },
};
</script>
