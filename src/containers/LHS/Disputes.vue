<template>
  <lhs-menu :items="items" />
</template>

<script>
import { ROUTE_NAMES } from '@/constants';
import LhsMenu from './LhsMenu';

export default {
  name: 'disputes',
  components: { LhsMenu },
  computed: {
    items() {
      return [
        {
          action: 'dashboard',
          title: this.$t('disputes.dashboard'),
          routeName: ROUTE_NAMES.DISPUTES_DASHBOARD,
        },
        {
          action: 'play_arrow',
          title: this.$t('orders'),
          routeName: ROUTE_NAMES.SELECT_ORDER,
          visible:
            this.isShowOrderWithoutExpectedComission || this.isShowOrderWithExpectedComission,
        },
        {
          action: 'list_alt',
          title: this.$t('disputes'),
          routeName: ROUTE_NAMES.DISPUTE_LIST,
          visible: this.isShowDispute,
        },
        {
          action: 'view_list',
          title: this.$t('resubmission.table.title'),
          routeName: ROUTE_NAMES.RESUBMISSION_TABLE,
          visible: this.isShowResubmissionTable,
        },
        {
          action: 'face',
          title: this.$t('disputes.by.submitters'),
          routeName: ROUTE_NAMES.DISPUTES_BY_SUBMITTERS,
        },
        {
          action: 'build',
          title: 'System',
          items: [],
        },
      ];
    },
  },
};
</script>
