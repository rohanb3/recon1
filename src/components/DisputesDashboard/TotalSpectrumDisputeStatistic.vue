<template>
  <disput-statistic
    :title="$t('disputes.dashboard.total.spectrum.statistic')"
    :sub-title="$t('total.disputes')"
    :total-statistics="totalStatistics"
    :statistics="disputeStatistics"
  />
</template>

<script>
import DisputStatistic from './DisputStatistic/DisputStatistic';
import { DISPUTE_SECTION_NAME } from '@/constants';
import disputesDashboard from '@/mixins/disputesDashboard';
import { STATISTIC_COLOR_SCHEMA } from '@/services/statisticColorSchema';

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
