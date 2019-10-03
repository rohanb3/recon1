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
          routeName: ROUTE_NAMES.DISPUTES_ORDERS,
          visible:
            this.isShowOrderWithoutExpectedComission || this.isShowOrderWithExpectedComission,
        },
        {
          action: 'list_alt',
          title: this.$t('claims.list'),
          routeName: ROUTE_NAMES.DISPUTE_LIST,
          visible: this.isShowDispute,
        },
      ];
    },
  },
};
</script>
