<template>
  <div class="orders-table-toolbar">
    <quick-search-filter :tableName="tableName" />
    <div class="table-filter-container">
      <order-status-filter :table-name="tableName" />
    </div>
    <v-spacer></v-spacer>
    <table-button
      :disabled="isOrdersSyncing"
      :title="$t('sync.orders')"
      @click="$emit('syncOrders')"
    />
    <table-button :title="$t('export')" @click="$emit('exportToCsvFile')" />
  </div>
</template>

<script>
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import OrderStatusFilter from '@/containers/OrderStatusFilter';
import TableButton from '@/components/TableButton';
import { ENTITY_TYPES, ORDER_SYNC_STATUS } from '@/constants';

export default {
  name: 'OrdersTableToolbar',
  components: {
    QuickSearchFilter,
    OrderStatusFilter,
    TableButton,
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
@import '~@/assets/styles/variables.scss';

.orders-table-toolbar {
  display: flex;
  flex: 1;
  margin-left: 20px;

  .quick-search {
    flex: 0;
  }

  .table-filter-container /deep/ {
    display: flex;
    .filter-wrapper {
      &:first-child .table-filter {
        border-radius: 3px 0 0 3px;
        border-right-color: $table-filter-border-right-color;
      }
      &:last-child .table-filter {
        border-radius: 0 3px 3px 0;
      }
      &:only-of-type .table-filter {
        border-radius: 3px;
      }
    }
  }
}
</style>
