<template>
  <lhs-menu :items="items" />
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTE_NAMES } from '@/constants';
import LhsMenu from './LhsMenu';

export default {
  name: 'claims',
  components: { LhsMenu },
  computed: {
    ...mapGetters([
      'isShowOrderWithoutExpectedComission',
      'isShowOrderWithExpectedComission',
      'isShowDispute',
      'isShowResubmissionTable',
      'isShowDisputeDashboard',
      'isShowSubmitters',
    ]),
    items() {
      return [
        {
          action: 'dashboard',
          title: this.$t('claims.dashboard'),
          routeName: ROUTE_NAMES.CLAIMS_DASHBOARD,
          visible: this.isShowDisputeDashboard,
        },
        {
          action: 'play_arrow',
          title: this.$t('orders'),
          routeName: ROUTE_NAMES.CLAIMS_ORDERS,
        },
        {
          action: 'list_alt',
          title: this.$t('claims.list'),
          routeName: ROUTE_NAMES.CLAIMS_DISPUTES,
          visible: this.isShowDispute,
        },
        {
          action: 'view_list',
          title: this.$t('resubmission.table.title'),
          routeName: ROUTE_NAMES.CLAIMS_RESUBMISSION,
          visible: this.isShowResubmissionTable,
        },
        {
          action: 'face',
          title: this.$t('claims.by.submitters'),
          routeName: ROUTE_NAMES.CLAIMS_BY_SUBMITTERS,
          visible: this.isShowSubmitters,
        },
      ];
    },
  },
};
</script>
