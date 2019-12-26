<template>
  <div class="filter-wrapper">
    <dispute-status-filter
      :title="title"
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
  name: 'SpectrumDisputeStatusFilter',
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
    title: {
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
          [this.sendFieldName]: DISPUTE_COMPUTED_STATUSES.SPECTRUM_APPROVED,
          name: this.$t('approved'),
        },
        {
          id: DISPUTE_STATUSES_ID.SENT,
          name: this.$t('new'),
          [this.sendFieldName]: DISPUTE_COMPUTED_STATUSES.SPECTRUM_NEW,
        },
        {
          id: DISPUTE_STATUSES_ID.IN_PROGRESS,
          name: this.$t('in.progress'),
          [this.sendFieldName]: DISPUTE_COMPUTED_STATUSES.SPECTRUM_IN_PROGRESS,
        },
        {
          id: DISPUTE_STATUSES_ID.CONFIRM_REJECTED,
          name: this.$t('rejected'),
          [this.sendFieldName]: DISPUTE_COMPUTED_STATUSES.SPECTRUM_REJECTED,
        },
      ];
    },
  },
};
</script>
