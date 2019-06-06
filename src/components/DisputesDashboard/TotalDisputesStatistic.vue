<template>
  <disput-statistic
    :title="$t('disputes.dashboard.total.statistic')"
    :total-statistics="totalStatistics"
    :statistics="disputeStatistics"
    :marker-color-list="markerColorList"
  />
</template>

<script>
import DisputStatistic from './DisputStatistic';
import { DISPUTE_STATUSES_NAME } from '@/constants';
import disputesDashboard from '@/mixins/disputesDashboard';

export default {
  name: 'TotalDisputesStatistic',
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
          sectionName: this.$t('disputes.statistic.spectrum.answer'),
          totalQuantity:
            this.sentDisputeStatistics.totalQuantity +
            this.resentDisputeStatistics.totalQuantity +
            this.inProgressDisputeStatistics.totalQuantity,
          percent:
            this.sentDisputeStatistics.Percent +
            this.resentDisputeStatistics.Percent +
            this.inProgressDisputeStatistics.Percent,
          commissionDifference:
            this.sentDisputeStatistics.Commission +
            this.resentDisputeStatistics.Commission +
            this.inProgressDisputeStatistics.Commission,
        },
        {
          sectionName: this.$t('disputes.statistic.xyz.answer'),
          totalQuantity:
            this.approvedDisputeStatistics.totalQuantity +
            this.rejectedDisputeStatistics.totalQuantity,
          percent: this.approvedDisputeStatistics.Percent + this.rejectedDisputeStatistics.Percent,
          commissionDifference:
            this.approvedDisputeStatistics.Commission + this.rejectedDisputeStatistics.Commission,
        },
        {
          sectionName: this.$t('disputes.statistic.approved.for.pay'),
          totalQuantity: this.confirmApprovedDisputeStatistics.totalQuantity,
          percent: this.confirmApprovedDisputeStatistics.Percent,
          commissionDifference: this.confirmApprovedDisputeStatistics.Commission,
        },
        {
          sectionName: this.$t('disputes.statistic.deny.for.pay'),
          totalQuantity: this.confirmRejectedDisputeStatistics.totalQuantity,
          percent: this.confirmRejectedDisputeStatistics.Percent,
          commissionDifference: this.confirmRejectedDisputeStatistics.Commission,
        },
      ];
    },
    sentDisputeStatistics() {
      return this.getSection(DISPUTE_STATUSES_NAME.SENT);
    },
    resentDisputeStatistics() {
      return this.getSection(DISPUTE_STATUSES_NAME.RE_SENT);
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
    confirmApprovedDisputeStatistics() {
      return this.getSection(DISPUTE_STATUSES_NAME.CONFIRM_APPROVED);
    },
    confirmRejectedDisputeStatistics() {
      return this.getSection(DISPUTE_STATUSES_NAME.CONFIRM_REJECTED);
    },
  },
};
</script>
