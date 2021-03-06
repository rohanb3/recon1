<template>
  <claims-statistic
    :title="$t('claims.dashboard.total.statistic')"
    :sub-title="$t('total.claims')"
    :total-statistics="claimTotalStatistic"
    :statistics="disputeStatistics"
  />
</template>

<script>
import {
  DISPUTE_SECTION_NAME,
  ROUTE_NAMES,
  FILTER_NAMES,
  DISPUTE_COMPUTED_STATUSES,
} from '@/constants';
import disputesDashboard from '@/mixins/disputesDashboard';
import { STATISTIC_COLOR_SCHEMA } from '@/services/statisticColorSchema';
import ClaimsStatistic from '../DisputesDashboard/DisputStatistic/ClaimsStatistic';

export default {
  name: 'TotalClaimsStatistic',
  components: {
    ClaimsStatistic,
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
          link: {
            name: ROUTE_NAMES.CLAIMS_DISPUTES,
            params: {
              [FILTER_NAMES.SPECTRUM_STATUS_IDS]: [
                ...DISPUTE_COMPUTED_STATUSES.SPECTRUM_NEW,
                ...DISPUTE_COMPUTED_STATUSES.SPECTRUM_IN_PROGRESS,
                ...DISPUTE_COMPUTED_STATUSES.SPECTRUM_RESENT,
              ],
              [FILTER_NAMES.CLAIMS_STATUS_IDS]: [
                ...DISPUTE_COMPUTED_STATUSES.SPECTRUM_NEW,
                ...DISPUTE_COMPUTED_STATUSES.SPECTRUM_IN_PROGRESS,
                ...DISPUTE_COMPUTED_STATUSES.SPECTRUM_RESENT,
              ],
            },
          },
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.WAITED_XYZ_ANSWER),
          sectionName: this.$t('disputes.statistic.xyz.answer'),
          color: STATISTIC_COLOR_SCHEMA.BLUE,
          link: {
            name: ROUTE_NAMES.CLAIMS_DISPUTES,
            params: {
              [FILTER_NAMES.XYZ_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_WAITING_FOR_ANSWER,
              [FILTER_NAMES.CLAIMS_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_WAITING_FOR_ANSWER,
            },
          },
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.APPROVED_FOR_PAY),
          sectionName: this.$t('disputes.statistic.approved.for.pay'),
          color: STATISTIC_COLOR_SCHEMA.ORANGE,
          link: {
            name: ROUTE_NAMES.CLAIMS_DISPUTES,
            params: {
              [FILTER_NAMES.SPECTRUM_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.SPECTRUM_APPROVED,
              [FILTER_NAMES.CLAIMS_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.SPECTRUM_APPROVED,
              [FILTER_NAMES.XYZ_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_APPROVED,
              [FILTER_NAMES.CLAIMS_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_APPROVED,
            },
          },
        },
        {
          ...this.getSection(DISPUTE_SECTION_NAME.DENIED_FOR_PAY),
          sectionName: this.$t('disputes.statistic.deny.for.pay'),
          color: STATISTIC_COLOR_SCHEMA.GREY,
          link: {
            name: ROUTE_NAMES.CLAIMS_DISPUTES,
            params: {
              [FILTER_NAMES.XYZ_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_REJECTED,
              [FILTER_NAMES.CLAIMS_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_REJECTED,
            },
          },
        },
      ];
    },
  },
};
</script>
