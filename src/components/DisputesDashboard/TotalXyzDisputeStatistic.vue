<template>
  <disput-statistic
    :title="$t('disputes.dashboard.total.xyz.statistic')"
    :total-statistics="totalStatistics"
    :statistics="disputeStatistics"
  />
</template>

<script>
import DisputStatistic from './DisputStatistic/DisputStatistic';
import { DISPUTE_STATUSES_NAME } from '@/constants';
import disputesDashboard from '@/mixins/disputesDashboard';
import { STATISTIC_COLOR_SCHEMA } from '@/services/statisticColorSchema';

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
          color: STATISTIC_COLOR_SCHEMA.GREEN,
        },
        {
          sectionName: this.$t('confirm.approved.disputes'),
          totalQuantity: this.confirmApprovedDisputeStatistics.totalQuantity,
          percent: this.confirmApprovedDisputeStatistics.Percent,
          commissionDifference: this.confirmApprovedDisputeStatistics.Commission,
          color: STATISTIC_COLOR_SCHEMA.BLUE,
        },
        {
          sectionName: this.$t('confirm.rejected.disputes'),
          totalQuantity: this.confirmRejectedDisputeStatistics.totalQuantity,
          percent: this.confirmRejectedDisputeStatistics.Percent,
          commissionDifference: this.confirmRejectedDisputeStatistics.Commission,
          color: STATISTIC_COLOR_SCHEMA.ORANGE,
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
