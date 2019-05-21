<template>
  <div class="orders-table-toolbar">
    <quick-search-filter :tableName="tableName" />
    <div class="table-filter-container">
      <order-status-filter :table-name="tableName" />
    </div>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import OrderStatusFilter from '@/containers/OrderStatusFilter';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'OrdersTableToolbar',
  components: {
    QuickSearchFilter,
    OrderStatusFilter,
  },
  data() {
    return {
      tableName: ENTITY_TYPES.ORDERS,
    };
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

  .quick-search {
    flex: 0;
  }
}

.table-filter-container /deep/ {
  @include table-filter-container;
}
</style>
