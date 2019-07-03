<template>
  <div class="filter-wrapper">
    <dispute-status-filter
      :title="$t('disputes.dispute.status')"
      :tableName="tableName"
      :filterName="filterName"
      :dependentFilterName="dependentFilterName"
      :displayedOptions="displayedOptions"
      :send-field-name="sendFieldName"
    />
  </div>
</template>

<script>
import DisputeStatusFilter from '@/containers/DisputeStatusFilter';
import { FILTER_NAMES, DISPUTE_STATUSES_ID } from '@/constants';

export default {
  name: 'SpectrumDisputeStatusFilter',
  components: {
    DisputeStatusFilter,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filterName: FILTER_NAMES.SPECTRUM_STATUS_IDS,
      dependentFilterName: FILTER_NAMES.XYZ_STATUS_IDS,
      sendFieldName: 'ids',
    };
  },
  computed: {
    displayedOptions() {
      return [
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
      ];
    },
  },
};
</script>
