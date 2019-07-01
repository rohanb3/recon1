<template>
  <div class="filter-wrapper">
    <table-filter
      :title="$t('disputes.dispute.status')"
      boundaries-selector=".disputes-table"
      :items="disputeStatusList"
      :useQuickBtn="false"
      :useSearchField="false"
      :show-clear-button="true"
      @select="toggleItem"
      @clearAll="onClearAllItemDisplayed"
    />
  </div>
</template>

<script>
import flatten from 'lodash.flatten';
import debounce from 'lodash.debounce';
import TableFilter from '@/components/TableFilter';
import { FILTER_NAMES, DISPUTE_STATUSES_ID } from '@/constants';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { RESET_ITEMS, SET_ALL_ITEMS_LOADED } from '@/store/storage/mutationTypes';
import { extractPropertiesFromArrObj, pickDuplicate } from '@/services/utils';

const TIMEOUT_APPLY_FILTER = 1000;

export default {
  name: 'DisputeStatusFilter',
  mixins: [tableFilterAutocomplete],
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  components: {
    TableFilter,
  },
  data() {
    return {
      filterName: FILTER_NAMES.SPECTRUM_STATUS_IDS,
      [FILTER_NAMES.SPECTRUM_STATUS_IDS]: [
        {
          id: DISPUTE_STATUSES_ID.APPROVED,
          [this.sendFieldName]: [
            DISPUTE_STATUSES_ID.APPROVED,
            DISPUTE_STATUSES_ID.CONFIRM_APPROVED,
          ],
          name: this.$t('approved'),
        },
        {
          id: DISPUTE_STATUSES_ID.SENT,
          name: this.$t('new'),
          [this.sendFieldName]: [DISPUTE_STATUSES_ID.SENT],
        },
        {
          id: DISPUTE_STATUSES_ID.IN_PROGRESS,
          name: this.$t('in.progress'),
          [this.sendFieldName]: [DISPUTE_STATUSES_ID.IN_PROGRESS],
        },
        {
          id: DISPUTE_STATUSES_ID.CONFIRM_REJECTED,
          name: this.$t('rejected'),
          [this.sendFieldName]: [
            DISPUTE_STATUSES_ID.CONFIRM_REJECTED,
            DISPUTE_STATUSES_ID.RE_SENT,
            DISPUTE_STATUSES_ID.REJECTED,
          ],
        },
      ],
    };
  },
  computed: {
    disputeStatusList() {
      return this[this.filterName];
    },
    xyzStatusIds() {
      return this.filters[FILTER_NAMES.XYZ_STATUS_IDS] || [];
    },
    isAppliedFilterByXyzStatus() {
      return !!this.xyzStatusIds.length;
    },
  },
  methods: {
    applyFilter: debounce(function applyFilter(selectedItems) {
      let disputeStatusIds = [];
      let dataLoading = true;

      const spectrumStatusIds = Array.from(
        new Set(flatten(extractPropertiesFromArrObj(selectedItems, this.sendFieldName)))
      );

      if (this.isAppliedFilterByXyzStatus) {
        if (spectrumStatusIds.length) {
          disputeStatusIds = pickDuplicate(spectrumStatusIds, this.xyzStatusIds);
          if (disputeStatusIds.length === 0) {
            dataLoading = false;
            this.$store.commit(RESET_ITEMS, this.tableName);
            this.$store.commit(SET_ALL_ITEMS_LOADED, this.tableName);
          }
        } else {
          disputeStatusIds = this.xyzStatusIds;
        }
      } else {
        disputeStatusIds = spectrumStatusIds;
      }

      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: FILTER_NAMES.SPECTRUM_STATUS_IDS,
            value: spectrumStatusIds,
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
