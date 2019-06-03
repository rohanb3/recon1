<template>
  <div class="orders-table-toolbar">
    <quick-search-filter :tableName="tableName" />
    <div class="table-filter-container">
      <order-status-filter :table-name="tableName" />
      <order-age-filter :table-name="tableName" />
      <installation-age-filter :table-name="tableName" />
    </div>
    <v-spacer></v-spacer>
    <table-button
      :disabled="isOrdersSyncing"
      :title="$t('sync.orders')"
      @click="$emit('syncOrders')"
    />
    <table-button :title="$t('export')" @click="$emit('exportToCsvFile')" />
    <fiscal-period-filter :tableName="tableName" />
  </div>
</template>

<script>
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import OrderStatusFilter from '@/containers/OrderStatusFilter';
import OrderAgeFilter from './OrderAgeFilter';
import InstallationAgeFilter from './InstallationAgeFilter';
import TableButton from '@/components/TableButton';
import { ENTITY_TYPES, ORDER_SYNC_STATUS } from '@/constants';
import FiscalPeriodFilter from '@/containers/FiscalPeriodFilter';

export default {
  name: 'OrdersTableToolbar',
  components: {
    QuickSearchFilter,
    OrderStatusFilter,
    OrderAgeFilter,
    InstallationAgeFilter,
    TableButton,
    FiscalPeriodFilter,
  },
  data() {
    return {
      tableName: ENTITY_TYPES.ORDERS,
    };
  },
  computed: {
    storageData() {
      return this.$store.state.storage[this.tableName] || {};
    },
    isOrdersSyncing() {
      return this.storageData.syncOrdersStatus === ORDER_SYNC_STATUS.WORKING;
    },
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
