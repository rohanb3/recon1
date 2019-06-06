<template>
  <disput-statistic
    :title="$t('disputes.dashboard.total.xyz.statistic')"
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
  name: 'TotalXyzDisputeStatistic',
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
          sectionName: this.$t('waiting.for.answer'),
          totalQuantity:
            this.approvedDisputeStatistics.totalQuantity +
            this.rejectedDisputeStatistics.totalQuantity,
          percent: this.approvedDisputeStatistics.Percent + this.rejectedDisputeStatistics.Percent,
          commissionDifference:
            this.approvedDisputeStatistics.Commission + this.rejectedDisputeStatistics.Commission,
        },
        {
          sectionName: this.$t('confirm.approved.disputes'),
          totalQuantity: this.confirmApprovedDisputeStatistics.totalQuantity,
          percent: this.confirmApprovedDisputeStatistics.Percent,
          commissionDifference: this.confirmApprovedDisputeStatistics.Commission,
        },
        {
          sectionName: this.$t('confirm.rejected.disputes'),
          totalQuantity: this.confirmRejectedDisputeStatistics.totalQuantity,
          percent: this.confirmRejectedDisputeStatistics.Percent,
          commissionDifference: this.confirmRejectedDisputeStatistics.Commission,
        },
      ];
    },
    confirmApprovedDisputeStatistics() {
      return this.getSection(DISPUTE_STATUSES_NAME.CONFIRM_APPROVED);
    },
    confirmRejectedDisputeStatistics() {
      return this.getSection(DISPUTE_STATUSES_NAME.CONFIRM_REJECTED);
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
