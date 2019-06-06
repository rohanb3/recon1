<template>
  <disput-statistic
    :title="$t('disputes.dashboard.total.spectrum.statistic')"
    :total-statistics="totalStatistics"
    :statistics="disputeStatistics"
    :marker-color-list="markerColorList"
  />
</template>

<script>
import DisputStatistic from './DisputStatistic/DisputStatistic';
import { DISPUTE_STATUSES_NAME } from '@/constants';
import disputesDashboard from '@/mixins/disputesDashboard';

export default {
  name: 'TotalSpectrumDisputeStatistic',
  components: {
    DisputStatistic,
  },
  props: {
    statistics: {
      type: Array,
      required: true,
    },
  },
  mixins: [disputesDashboard],
  computed: {
    disputeStatistics() {
      return [
        {
          sectionName: this.$t('in.progress'),
          totalQuantity: this.inProgressDisputeStatistics.totalQuantity,
          percent: this.inProgressDisputeStatistics.Percent,
          commissionDifference: this.inProgressDisputeStatistics.Commission,
        },
        {
          sectionName: this.$t('rejected'),
          totalQuantity: this.rejectedDisputeStatistics.totalQuantity,
          percent: this.rejectedDisputeStatistics.Percent,
          commissionDifference: this.rejectedDisputeStatistics.Commission,
        },
        {
          sectionName: this.$t('approved'),
          totalQuantity: this.approvedDisputeStatistics.totalQuantity,
          percent: this.approvedDisputeStatistics.Percent,
          commissionDifference: this.approvedDisputeStatistics.Commission,
        },
      ];
    },
    inProgressDisputeStatistics() {
      return this.getSection(DISPUTE_STATUSES_NAME.IN_PROGRESS);
    },
    approvedDisputeStatistics() {
      return this.getSection(DISPUTE_STATUSES_NAME.APPROVED);
    },
    rejectedDisputeStatistics() {
      return this.getSection(DISPUTE_STATUSES_NAME.REJECTED);
    },
  },
};
</script>
