<template>
  <table-toolbar :title="$t('orders.select.order.dispute')" :table-name="tableName">
    <selected-range-filter slot="toolbar-info" :tableName="tableName" />
    <div slot="filters" class="orders-table-toolbar">
      <quick-search-filter :table-name="tableName" />
      <div class="table-filter-container">
        <disputes-order-status-filter :table-name="tableName" />
        <orders-dispute-type-filter :table-name="tableName" />
      </div>
      <v-spacer></v-spacer>
      <div class="table-filter-container">
        <sync-orders :table-name="tableName" />
        <export-to-cvs-disputes :tableName="tableName" />
        <fiscal-period-filter :table-name="tableName" />
        <custom-range-filter :table-name="tableName" />
      </div>
    </div>
  </table-toolbar>
</template>

<script>
import TableToolbar from '@/components/TableToolbar';
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import SyncOrders from './SyncOrders';
import FiscalPeriodFilter from './FiscalPeriodFilter';
import CustomRangeFilter from './CustomRangeFilter';
import ExportToCvsDisputes from './ExportToCvsDisputes';
import DisputesOrderStatusFilter from './DisputesOrderStatusFilter';
import OrdersDisputeTypeFilter from './OrdersDisputeTypeFilter';
import SelectedRangeFilter from '@/components/SelectedRangeFilter';

export default {
  name: 'DisputesOrdersToolbar',
  props: ['tableName'],
  components: {
    OrdersDisputeTypeFilter,
    DisputesOrderStatusFilter,
    ExportToCvsDisputes,
    CustomRangeFilter,
    FiscalPeriodFilter,
    SyncOrders,
    QuickSearchFilter,
    TableToolbar,
    SelectedRangeFilter,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.orders-table-toolbar {
  display: flex;
  flex: 1;
  margin-left: 20px;
  align-items: center;

  .quick-search {
    flex: 0;
  }
}

.table-filter-container /deep/ {
  @include table-filter-container;
  flex-wrap: wrap;
}
</style>
