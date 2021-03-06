<template>
  <claims-statistic
    :title="$t('claims.dashboard.total.xyz.statistic')"
    :sub-title="$t('total.claims')"
    :total-statistics="claimTotalStatistic"
    :statistics="disputeStatistics"
  />
</template>

<script>
import {
  DISPUTE_SECTION_NAME,
  CLAIM_SECTION_NAME,
  ROUTE_NAMES,
  FILTER_NAMES,
  DISPUTE_COMPUTED_STATUSES,
} from '@/constants';
import disputesDashboard from '@/mixins/disputesDashboard';
import { STATISTIC_COLOR_SCHEMA } from '@/services/statisticColorSchema';
import ClaimsStatistic from '../DisputesDashboard/DisputStatistic/ClaimsStatistic';

export default {
  name: 'TotalXyzClaimStatistic',
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
          ...this.getSection(DISPUTE_SECTION_NAME.WAITING_FOR_ANSWER),
          sectionName: this.$t('waiting.for.answer'),
          color: STATISTIC_COLOR_SCHEMA.GREEN,
          link: {
            name: ROUTE_NAMES.CLAIMS_DISPUTES,
            params: {
              [FILTER_NAMES.XYZ_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_WAITING_FOR_ANSWER,
              [FILTER_NAMES.CLAIMS_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_WAITING_FOR_ANSWER,
            },
          },
        },
        {
          ...this.getSection(CLAIM_SECTION_NAME.RE_SENT_CLAIMS),
          sectionName: this.$t('re.sent.claims'),
          color: STATISTIC_COLOR_SCHEMA.BLUE,
          link: {
            name: ROUTE_NAMES.CLAIMS_DISPUTES,
            params: {
              [FILTER_NAMES.XYZ_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_RESENT,
              [FILTER_NAMES.CLAIMS_STATUS_IDS]: DISPUTE_COMPUTED_STATUSES.XYZ_RESENT,
            },
          },
        },
        {
          ...this.getSection(CLAIM_SECTION_NAME.CONFIRM_REJECTED),
          sectionName: this.$t('confirm.rejected.claims'),
          color: STATISTIC_COLOR_SCHEMA.ORANGE,
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
