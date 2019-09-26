<template>
  <orders-content
    :table-name="tableName"
    :toolbar-title="toolbarTitle"
    :filtered-field-from="filteredFieldFrom"
    :filtered-field-to="filteredFieldTo"
  >
    <claims-orders-toolbar
      slot="toolbar"
      :table-name="tableName"
      :filtered-field-from="filteredFieldFrom"
      :filtered-field-to="filteredFieldTo"
    />
  </orders-content>
</template>

<script>
import { ENTITY_TYPES, FILTER_NAMES } from '@/constants';
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
    toolbarTitle() {
      return 'orders.select.order.claim';
    },
    filteredFieldFrom() {
      return FILTER_NAMES.CREATED_FROM;
    },
    filteredFieldTo() {
      return FILTER_NAMES.CREATED_TO;
    },
    getTableName() {
      return this.tableName.toLowerCase();
    },
  },
};
</script>
