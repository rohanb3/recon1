<template>
  <order-status-filter :table-name="tableName" :loadData="getDisputesOrderStatusList" />
</template>

<script>
import OrderStatusFilter from './OrderStatusFilter';
import { getDisputesOrderStatusList } from '@/services/ordersRepository';

export default {
  name: 'DisputesOrderStatusFilter',
  components: { OrderStatusFilter },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    getDisputesOrderStatusList() {
      return getDisputesOrderStatusList;
    },
  },
};
</script>
