<template>
  <orders-content :table-name="tableName">
    <claims-orders-toolbar slot="toolbar" :table-name="tableName" />
  </orders-content>
</template>

<script>
import { ENTITY_TYPES } from '@/constants';
import OrdersContent from './OrdersContent';
import ClaimsOrdersToolbar from './ClaimsOrdersToolbar';

export default {
  name: 'ClaimsOrders',
  components: {
    ClaimsOrdersToolbar,
    OrdersContent,
  },
  computed: {
    tableName() {
      return ENTITY_TYPES.CLAIMS_ORDERS;
    },
  },
};
</script>
