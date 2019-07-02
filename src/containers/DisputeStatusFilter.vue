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
import intersection from 'lodash.intersection';
import TableFilter from '@/components/TableFilter';
import { FILTER_NAMES } from '@/constants';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import {
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
} from '@/store/storage/mutationTypes';
import {
  SET_FILTERS,
  APPLYING_FILTERS_DONE,
} from '@/store/tables/mutationTypes';
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
  },
  components: {
    TableFilter,
  },
  data() {
    return {
      [this.filterName]: this.displayedOptions,
    };
  },
  computed: {
    disputeStatusList() {
      return this[this.filterName];
    },
    dependentFilterItemIds() {
      return this.filters[this.dependentFilterName] || [];
    },
    isAppliedDependentFilter() {
      return !!this.dependentFilterItemIds.length;
    },
  },
  methods: {
    applyFiltersWithoutLoadingData(data) {
      const { tableName } = data;
      this.$store.commit(SET_FILTERS, data);
      this.$store.commit(APPLYING_FILTERS_DONE, tableName);
    },
    selectedStatusIds(selectedItems) {
      return Array.from(
        new Set(
          flatten(
            extractPropertiesFromArrObj(selectedItems, this.sendFieldName)
          )
        )
      );
    },
    showNoResultsFound() {
      this.$store.commit(RESET_ITEMS, this.tableName);
      this.$store.commit(SET_ALL_ITEMS_LOADED, this.tableName);
    },
    isContainedDisputeStatusIds(items) {
      return items.length > 0;
    },
    disputeStatusIds(selectedStatusIds) {
      let disputeStatusIds = [];
      let dataLoading = true;

      if (this.isAppliedDependentFilter) {
        if (selectedStatusIds.length) {
          disputeStatusIds = intersection(
            selectedStatusIds,
            this.dependentFilterItemIds
          );
          dataLoading = this.isContainedDisputeStatusIds(disputeStatusIds);
        } else {
          disputeStatusIds = this.dependentFilterItemIds;
        }
      } else {
        disputeStatusIds = selectedStatusIds;
      }

      return { dataLoading, disputeStatusIds };
    },
    debounceApplyFilter(selectedItems) {
      const selectedStatusIds = this.selectedStatusIds(selectedItems);
      const { dataLoading, disputeStatusIds } = this.disputeStatusIds(
        selectedStatusIds
      );

      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: this.filterName,
            value: selectedStatusIds,
          },
          {
            name: FILTER_NAMES.DISPUTE_STATUS_IDS,
            value: disputeStatusIds,
          },
        ],
      };

      if (dataLoading) {
        this.$store.dispatch(APPLY_FILTERS, data);
      } else {
        this.showNoResultsFound();
        this.applyFiltersWithoutLoadingData(data);
      }
    },
    applyFilter: debounce(function applyFilter(selectedItems) {
      this.debounceApplyFilter(selectedItems);
    }, TIMEOUT_APPLY_FILTER),
  },
};
</script>
