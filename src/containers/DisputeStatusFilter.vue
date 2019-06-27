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
import TableFilter from '@/components/TableFilter';
import { FILTER_NAMES, DISPUTE_STATUSES_ID } from '@/constants';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';

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
  },
};
</script>
