<template>
  <orders-content toolbar-title="orders.select.order.claim" :table-name="tableName" />
</template>

<script>
import OrdersContent from '@/containers/OrdersContent';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'ClaimsOrders',
  components: { OrdersContent },
  computed: {
    tableName() {
      return ENTITY_TYPES.CLAIMS_ORDERS;
    },
  },
};
</script>
