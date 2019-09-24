<template>
  <orders-content toolbar-title="orders.select.order.dispute" :table-name="tableName" />
</template>

<script>
import OrdersContent from '@/containers/OrdersContent';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'DisputesOrders',
  components: { OrdersContent },
  computed: {
    tableName() {
      return ENTITY_TYPES.DISPUTES_ORDERS;
    },
  },
};
</script>
