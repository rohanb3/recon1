<template>
  <disput-statistic
    :title="$t('claims.dashboard.total.xyz.statistic')"
    :subTitle="$t('total.claims')"
    :total-statistics="totalStatistics"
    :statistics="disputeStatistics"
  />
</template>

<script>
import DisputStatistic from '../DisputesDashboard/DisputStatistic/DisputStatistic';
import { DISPUTE_SECTION_NAME } from '@/constants';
import disputesDashboard from '@/mixins/disputesDashboard';
import { STATISTIC_COLOR_SCHEMA } from '@/services/statisticColorSchema';

export default {
  name: 'TotalXyzClaimStatistic',
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
          ...this.getSection(DISPUTE_SECTION_NAME.WAITING_FOR_ANSWER),
          sectionName: this.$t('waiting.for.answer'),
          color: STATISTIC_COLOR_SCHEMA.GREEN,
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.RE_SENT_DISPUTES),
          sectionName: this.$t('re.sent.claims'),
          color: STATISTIC_COLOR_SCHEMA.BLUE,
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.CONFIRM_REJECTED),
          sectionName: this.$t('confirm.rejected.claims'),
          color: STATISTIC_COLOR_SCHEMA.ORANGE,
        },
      ];
    },
  },
};
</script>
