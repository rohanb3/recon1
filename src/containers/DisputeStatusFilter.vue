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
import { FILTER_NAMES } from '@/constants';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import {
  RESET_ITEMS,
  SET_ALL_ITEMS_LOADED,
} from '@/store/storage/mutationTypes';
import { extractPropertiesFromArrObj, pickDuplicate } from '@/services/utils';

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
    selectedStatusIds(selectedItems) {
      return Array.from(
        new Set(
          flatten(
            extractPropertiesFromArrObj(selectedItems, this.sendFieldName)
          )
        )
      );
    },
    isContainedDisputeStatusIds(items) {
      if (items.length === 0) {
        this.$store.commit(RESET_ITEMS, this.tableName);
        this.$store.commit(SET_ALL_ITEMS_LOADED, this.tableName);
        return false;
      }
      return true;
    },
    disputeStatusIds(selectedStatusIds) {
      let disputeStatusIds = [];
      let dataLoading = true;

      if (this.isAppliedDependentFilter) {
        if (selectedStatusIds.length) {
          disputeStatusIds = pickDuplicate(
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
    applyFilter: debounce(function applyFilter(selectedItems) {
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
        dataLoading,
      };

      this.$store.dispatch(APPLY_FILTERS, data);
    }, TIMEOUT_APPLY_FILTER),
  },
};
</script>
