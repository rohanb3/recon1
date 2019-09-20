<template>
  <orders-content :toolbar-title="toolbarTitle" :table-name="tableName" :key="tableName" />
</template>

<script>
import { mapGetters } from 'vuex';
import { ENTITY_TYPES } from '@/constants';
import OrdersContent from './OrdersContent';

export default {
  name: 'OrdersPage',
  components: { OrdersContent },
  computed: {
    ...mapGetters({
      isClaims: 'isClaims',
    }),
    tableName() {
      return this.isClaims ? ENTITY_TYPES.CLAIMS_ORDERS : ENTITY_TYPES.DISPUTES_ORDERS;
    },
    toolbarTitle() {
      return this.isClaims ? 'orders.select.order.claim' : 'orders.select.order.dispute';
    },
  },
};
</script>

<style scoped></style>
