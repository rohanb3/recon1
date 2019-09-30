<template>
  <order-status-filter :table-name="tableName" :loadData="getClaimsOrderStatusList" />
</template>

<script>
import OrderStatusFilter from './OrderStatusFilter';
import { getClaimsOrderStatusList } from '@/services/ordersRepository';

export default {
  name: 'ClaimsOrderStatusFilter',
  components: { OrderStatusFilter },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    getClaimsOrderStatusList() {
      return getClaimsOrderStatusList;
    },
  },
};
</script>
