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
import TableFilter from '@/components/TableFilter';
import { FILTER_NAMES, DISPUTE_STATUSES_ID } from '@/constants';
import tableFilterAutocomplete from '@/mixins/tableFilterAutocomplete';

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
  },
};
</script>
