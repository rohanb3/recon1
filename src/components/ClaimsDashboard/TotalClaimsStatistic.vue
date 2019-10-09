<template>
  <disput-statistic
    :title="$t('claims.dashboard.total.statistic')"
    :sub-title="$t('total.claims')"
    :total-statistics="claimTotalStatistic"
    :statistics="disputeStatistics"
  />
</template>

<script>
import DisputStatistic from '../DisputesDashboard/DisputStatistic/DisputStatistic';
import { DISPUTE_SECTION_NAME } from '@/constants';
import disputesDashboard from '@/mixins/disputesDashboard';
import { STATISTIC_COLOR_SCHEMA } from '@/services/statisticColorSchema';

export default {
  name: 'TotalClaimsStatistic',
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
    claimTotalStatistic() {
      return this.getSection('Total Claims');
    },
    disputeStatistics() {
      return [
        {
          ...this.getSection(DISPUTE_SECTION_NAME.WAITED_SPECTRUM_ANSWER),
          sectionName: this.$t('disputes.statistic.spectrum.answer'),
          color: STATISTIC_COLOR_SCHEMA.GREEN,
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.WAITED_XYZ_ANSWER),
          sectionName: this.$t('disputes.statistic.xyz.answer'),
          color: STATISTIC_COLOR_SCHEMA.BLUE,
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.APPROVED_FOR_PAY),
          sectionName: this.$t('disputes.statistic.approved.for.pay'),
          color: STATISTIC_COLOR_SCHEMA.ORANGE,
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.DENIED_FOR_PAY),
          sectionName: this.$t('disputes.statistic.deny.for.pay'),
          color: STATISTIC_COLOR_SCHEMA.GREY,
        },
      ];
    },
  },
};
</script>