<template>
  <div class="filter-wrapper">
    <table-filter
      :title="$t('disputes.dispute.status')"
      boundaries-selector=".disputes-table"
      :items="disputeStatusList"
      :useQuickBtn="false"
      :useSearchField="false"
      @select="toggleItem"
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
      filterName: FILTER_NAMES.DISPUTE_STATUS_IDS,
      [FILTER_NAMES.DISPUTE_STATUS_IDS]: [
        {
          id: DISPUTE_STATUSES_ID.APPROVED,
          name: this.$t('approved'),
        },
        {
          id: DISPUTE_STATUSES_ID.RE_SENT,
          name: this.$t('resent'),
        },
        {
          id: DISPUTE_STATUSES_ID.SENT,
          name: this.$t('new'),
        },
        {
          id: DISPUTE_STATUSES_ID.REJECTED,
          name: this.$t('rejected'),
        },
        {
          id: DISPUTE_STATUSES_ID.IN_PROGRESS,
          name: this.$t('in.progress'),
        },
        {
          id: DISPUTE_STATUSES_ID.CONFIRM_REJECTED,
          name: this.$t('confirm.rejected'),
        },
        {
          id: DISPUTE_STATUSES_ID.CONFIRM_APPROVED,
          name: this.$t('confirm.approved'),
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
