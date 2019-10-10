<template>
  <disput-statistic
    :title="$t('disputes.dashboard.total.statistic')"
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
          ...this.getSection(DISPUTE_SECTION_NAME.WAITED_SPECTRUM_ANSWER),
          sectionName: this.$t('disputes.statistic.spectrum.answer'),
          color: STATISTIC_COLOR_SCHEMA.GREEN,
          link: {
            name: ROUTE_NAMES.DISPUTE_LIST,
            params: {
              [FILTER_NAMES.SPECTRUM_STATUS_IDS]: [
                ...DISPUTE_COMPUTED_STATUSES.SPECTRUM_NEW,
                ...DISPUTE_COMPUTED_STATUSES.SPECTRUM_IN_PROGRESS,
              ],
              [FILTER_NAMES.DISPUTE_STATUS_IDS]: [
                ...DISPUTE_COMPUTED_STATUSES.SPECTRUM_NEW,
                ...DISPUTE_COMPUTED_STATUSES.SPECTRUM_IN_PROGRESS,
              ],
            },
          },
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.WAITED_XYZ_ANSWER),
          sectionName: this.$t('disputes.statistic.xyz.answer'),
          color: STATISTIC_COLOR_SCHEMA.BLUE,
          link: {
            name: ROUTE_NAMES.DISPUTE_LIST,
            params: {
              [FILTER_NAMES.XYZ_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_PENDING,
              [FILTER_NAMES.DISPUTE_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_PENDING,
            },
          },
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.APPROVED_FOR_PAY),
          sectionName: this.$t('disputes.statistic.approved.for.pay'),
          color: STATISTIC_COLOR_SCHEMA.ORANGE,
          link: {
            name: ROUTE_NAMES.DISPUTE_LIST,
            params: {
              [FILTER_NAMES.SPECTRUM_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.SPECTRUM_APPROVED,
              [FILTER_NAMES.DISPUTE_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.SPECTRUM_APPROVED,
              [FILTER_NAMES.XYZ_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_CONFIRMED,
              [FILTER_NAMES.DISPUTE_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_CONFIRMED,
            },
          },
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.DENIED_FOR_PAY),
          sectionName: this.$t('disputes.statistic.deny.for.pay'),
          color: STATISTIC_COLOR_SCHEMA.GREY,
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
