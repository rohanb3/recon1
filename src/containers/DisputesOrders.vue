<template>
  <orders-content
    :table-name="tableName"
    :toolbar-title="toolbarTitle"
    :filtered-field-from="filteredFieldFrom"
    :filtered-field-to="filteredFieldTo"
  >
    <disputes-orders-toolbar
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
import DisputesOrdersToolbar from './DisputesOrdersToolbar';

export default {
  name: 'DisputesOrders',
  components: {
    DisputesOrdersToolbar,
    OrdersContent,
  },
  computed: {
    tableName() {
      return ENTITY_TYPES.DISPUTES_ORDERS;
    },
    toolbarTitle() {
      return 'orders.select.order.dispute';
    },
    filteredFieldFrom() {
      return FILTER_NAMES.INSTALLATION_DATE_FROM;
    },
    filteredFieldTo() {
      return FILTER_NAMES.INSTALLATION_DATE_TO;
    },
    getTableName() {
      return this.tableName.toLowerCase();
    },
  },
};
</script>
