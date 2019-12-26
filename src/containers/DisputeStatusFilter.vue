<template>
  <table-filter
    :title="title"
    boundaries-selector=".disputes-table"
    :items="disputeStatusList"
    :useQuickBtn="false"
    :useSearchField="false"
    :show-clear-button="true"
    @select="toggleItem"
    @clearAll="onClearAllItemDisplayed"
  />
</template>

<script>
import flatten from 'lodash.flatten';
import debounce from 'lodash.debounce';
import TableFilter from '@/components/TableFilter';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import { APPLY_DISPUTE_STATUS_FILTER } from '@/store/tables/actionTypes';
import { extractPropertiesFromArrObj } from '@/services/utils';

const TIMEOUT_APPLY_FILTER = 1000;

export default {
  name: 'DisputeStatusFilter',
  mixins: [tableFilterAutocomplete],
  props: {
    title: {
      type: String,
      required: true,
    },
    tableName: {
      type: String,
      required: true,
    },
    filterName: {
      type: String,
      required: true,
    },
    dependentFilterName: {
      type: String,
      required: true,
    },
    displayedOptions: {
      type: Array,
      required: true,
    },
    filterField: {
      type: String,
      required: true,
    },
  },
  components: {
    TableFilter,
  },
  data() {
    return {
      [this.filterName]: this.displayedOptions,
    };
  },
  mounted() {
    this.$nextTick().then(this.displayPreselectItems);
  },
  computed: {
    disputeStatusList() {
      return this[this.filterName];
    },
  },
  methods: {
    selectedStatusIds(selectedItems) {
      return Array.from(
        new Set(flatten(extractPropertiesFromArrObj(selectedItems, this.sendFieldName)))
      );
    },
    doApplyFilter(selectedItems) {
      const data = {
        tableName: this.tableName,
        dependentFilterName: this.dependentFilterName,
        selectedFilter: {
          name: this.filterName,
          value: this.selectedStatusIds(selectedItems),
        },
        filterField: this.filterField,
      };
      this.$store.dispatch(APPLY_DISPUTE_STATUS_FILTER, data);
    },
    applyFilter: debounce(function applyFilter(selectedItems) {
      this.doApplyFilter(selectedItems);
    }, TIMEOUT_APPLY_FILTER),
  },
};
</script>
