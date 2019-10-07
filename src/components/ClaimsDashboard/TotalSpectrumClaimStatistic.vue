<template>
  <disput-statistic
    :title="$t('claims.dashboard.total.spectrum.statistic')"
    :subTitle="$t('total.claims')"
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
  name: 'TotalSpectrumClaimStatistic',
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
          ...this.getSection(DISPUTE_SECTION_NAME.ANSWERED),
          sectionName: this.$t('in.progress'),
          color: STATISTIC_COLOR_SCHEMA.GREEN,
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.REJECTED),
          sectionName: this.$t('rejected'),
          color: STATISTIC_COLOR_SCHEMA.BLUE,
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.APPROVED),
          sectionName: this.$t('approved'),
          color: STATISTIC_COLOR_SCHEMA.ORANGE,
        },
      ];
    },
  },
};
</script>
