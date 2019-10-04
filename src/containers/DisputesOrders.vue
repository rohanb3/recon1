<template>
  <orders-content :table-name="tableName">
    <disputes-orders-toolbar slot="toolbar" :table-name="tableName" />
  </orders-content>
</template>

<script>
import { TABLE_NAMES } from '@/constants';
import OrdersContent from './OrdersContent';
import DisputesOrdersToolbar from './DisputesOrdersToolbar';

export default {
  name: 'DisputesOrders',
  components: {
    DisputesOrdersToolbar,
    OrdersContent,
  },
  computed: {
    tableName() {
      return TABLE_NAMES.DISPUTES_ORDERS;
    },
  },
};
</script>
