<template>
  <table-toolbar :title="$t('orders.select.order.claim')" :table-name="tableName">
    <selected-range-filter slot="toolbar-info" :tableName="tableName" />
    <div slot="filters" class="orders-table-toolbar">
      <quick-search-filter :table-name="tableName" />
      <div class="table-filter-container">
        <claims-order-status-filter :table-name="tableName" />
        <order-age-filter :table-name="tableName" />
      </div>
      <v-spacer></v-spacer>
      <div class="table-filter-container">
        <sync-orders :table-name="tableName" />
        <export-to-cvs-claims :tableName="tableName" />
        <fiscal-period-filter :table-name="tableName" />
        <custom-range-filter :table-name="tableName" />
      </div>
    </div>
  </table-toolbar>
</template>

<script>
import TableToolbar from '@/components/TableToolbar';
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import OrderAgeFilter from '@/containers/OrderAgeFilter';
import SyncOrders from './SyncOrders';
import FiscalPeriodFilter from './FiscalPeriodFilter';
import CustomRangeFilter from './CustomRangeFilter';
import ExportToCvsClaims from './ExportToCvsClaims';
import ClaimsOrderStatusFilter from './ClaimsOrderStatusFilter';
import SelectedRangeFilter from '@/components/SelectedRangeFilter';

export default {
  name: 'ClaimsOrdersToolbar',
  props: ['tableName'],
  components: {
    ClaimsOrderStatusFilter,
    ExportToCvsClaims,
    CustomRangeFilter,
    FiscalPeriodFilter,
    SyncOrders,
    QuickSearchFilter,
    OrderAgeFilter,
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
