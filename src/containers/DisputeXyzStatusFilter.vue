<template>
  <div class="filter-wrapper">
    <table-filter
      :title="$t('disputes.xyz.status')"
      boundaries-selector=".disputes-table"
      :items="disputeXYZStatusList"
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
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';
import { FILTER_NAMES, DISPUTE_STATUSES_ID } from '@/constants';
import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { extractPropertiesFromArrObj, pickDuplicate } from '@/services/utils';

const TIMEOUT_APPLY_FILTER = 1000;

export default {
  name: 'DisputeXyzStatusFilter',
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
      filterName: FILTER_NAMES.XYZ_STATUS_IDS,
      [FILTER_NAMES.XYZ_STATUS_IDS]: [
        {
          id: DISPUTE_STATUSES_ID.SENT,
          [this.sendFieldName]: [DISPUTE_STATUSES_ID.SENT, DISPUTE_STATUSES_ID.IN_PROGRESS],
          name: this.$t('pending'),
        },
        {
          id: DISPUTE_STATUSES_ID.CONFIRM_APPROVED,
          [this.sendFieldName]: [
            DISPUTE_STATUSES_ID.CONFIRM_APPROVED,
            DISPUTE_STATUSES_ID.CONFIRM_REJECTED,
          ],
          name: this.$t('confirmed'),
        },
        {
          id: DISPUTE_STATUSES_ID.RE_SENT,
          [this.sendFieldName]: [DISPUTE_STATUSES_ID.RE_SENT],
          name: this.$t('resubmited'),
        },
        {
          id: DISPUTE_STATUSES_ID.CONFIRM_REJECTED,
          [this.sendFieldName]: [DISPUTE_STATUSES_ID.CONFIRM_REJECTED],
          name: this.$t('rejected'),
        },
        {
          id: DISPUTE_STATUSES_ID.APPROVED,
          [this.sendFieldName]: [DISPUTE_STATUSES_ID.APPROVED, DISPUTE_STATUSES_ID.REJECTED],
          name: this.$t('waiting.for.answer'),
        },
      ],
    };
  },
  computed: {
    disputeXYZStatusList() {
      return this[this.filterName];
    },
    spectrumStatusIds() {
      return this.filters[FILTER_NAMES.SPECTRUM_STATUS_IDS] || [];
    },
    isAppliedFilterBySpectrumStatus() {
      return this.spectrumStatusIds.length;
    },
  },
  methods: {
    applyFilter: debounce(function applyFilter(selectedItems) {
      let disputeStatusIds = [];

      const xyzStatusIds = flatten(extractPropertiesFromArrObj(selectedItems, this.sendFieldName));

      if (this.isAppliedFilterBySpectrumStatus) {
        if (xyzStatusIds.length) {
          disputeStatusIds = pickDuplicate(xyzStatusIds, this.spectrumStatusIds);
        } else {
          disputeStatusIds = this.spectrumStatusIds;
        }
      } else {
        disputeStatusIds = xyzStatusIds;
      }

      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: FILTER_NAMES.XYZ_STATUS_IDS,
            value: xyzStatusIds,
          },
          {
            name: FILTER_NAMES.DISPUTE_STATUS_IDS,
            value: disputeStatusIds,
          },
        ],
      };

      this.$store.dispatch(APPLY_FILTERS, data);
    }, TIMEOUT_APPLY_FILTER),
  },
};
</script>
