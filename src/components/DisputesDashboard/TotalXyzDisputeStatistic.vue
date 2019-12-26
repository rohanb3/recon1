<template>
  <disput-statistic
    :title="$t('disputes.dashboard.total.xyz.statistic')"
    :sub-title="$t('total.disputes')"
    :total-statistics="totalStatistics"
    :statistics="disputeStatistics"
  />
</template>

<script>
import DisputStatistic from './DisputStatistic/DisputStatistic';
import {
  DISPUTE_SECTION_NAME,
  ROUTE_NAMES,
  FILTER_NAMES,
  DISPUTE_COMPUTED_STATUSES,
} from '@/constants';
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
          ...this.getSection(DISPUTE_SECTION_NAME.WAITING_FOR_ANSWER),
          sectionName: this.$t('waiting.for.answer'),
          color: STATISTIC_COLOR_SCHEMA.GREEN,
          link: {
            name: ROUTE_NAMES.DISPUTE_LIST,
            params: {
              [FILTER_NAMES.XYZ_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_WAITING_FOR_ANSWER,
              [FILTER_NAMES.DISPUTE_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_WAITING_FOR_ANSWER,
            },
          },
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.RE_SENT_DISPUTES),
          sectionName: this.$t('re.sent.disputes'),
          color: STATISTIC_COLOR_SCHEMA.BLUE,
          link: {
            name: ROUTE_NAMES.DISPUTE_LIST,
            params: {
              [FILTER_NAMES.XYZ_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_RESENT,
              [FILTER_NAMES.DISPUTE_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_RESENT,
            },
          },
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.CONFIRM_REJECTED),
          sectionName: this.$t('confirm.rejected.disputes'),
          color: STATISTIC_COLOR_SCHEMA.ORANGE,
          link: {
            name: ROUTE_NAMES.DISPUTE_LIST,
            params: {
              [FILTER_NAMES.XYZ_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_REJECTED,
              [FILTER_NAMES.DISPUTE_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_REJECTED,
            },
          },
        },
      ];
    },
  },
};
</script>
