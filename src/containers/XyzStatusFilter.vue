<template>
  <div class="filter-wrapper">
    <dispute-status-filter
      :title="$t('disputes.xyz.status')"
      :tableName="tableName"
      :filterName="filterName"
      :dependentFilterName="dependentFilterName"
      :displayedOptions="displayedOptions"
      :send-field-name="sendFieldName"
      :filter-field="filterField"
    />
  </div>
</template>

<script>
import DisputeStatusFilter from '@/containers/DisputeStatusFilter';
import { FILTER_NAMES, DISPUTE_STATUSES_ID, DISPUTE_COMPUTED_STATUSES } from '@/constants';

export default {
  name: 'XyzStatusFilter',
  components: {
    DisputeStatusFilter,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
    filterField: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filterName: FILTER_NAMES.XYZ_STATUS_IDS,
      dependentFilterName: FILTER_NAMES.SPECTRUM_STATUS_IDS,
      sendFieldName: 'ids',
    };
  },
  computed: {
    displayedOptions() {
      return [
        {
          id: DISPUTE_STATUSES_ID.SENT,
          [this.sendFieldName]: DISPUTE_COMPUTED_STATUSES.XYZ_PENDING,
          name: this.$t('pending'),
        },
        {
          id: DISPUTE_STATUSES_ID.CONFIRM_APPROVED,
          [this.sendFieldName]: DISPUTE_COMPUTED_STATUSES.XYZ_CONFIRMED,
          name: this.$t('confirmed'),
        },
        {
          id: DISPUTE_STATUSES_ID.RE_SENT,
          [this.sendFieldName]: DISPUTE_COMPUTED_STATUSES.XYZ_RESENT,
          name: this.$t('resubmited'),
        },
        {
          id: DISPUTE_STATUSES_ID.CONFIRM_REJECTED,
          [this.sendFieldName]: DISPUTE_COMPUTED_STATUSES.XYZ_REJECTED,
          name: this.$t('rejected'),
        },
        {
          id: DISPUTE_STATUSES_ID.APPROVED,
          [this.sendFieldName]: DISPUTE_COMPUTED_STATUSES.XYZ_WAITING_FOR_ANSWER,
          name: this.$t('waiting.for.answer'),
        },
      ];
    },
  },
};
</script>
