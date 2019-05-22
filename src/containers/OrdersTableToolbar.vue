<template>
  <div class="orders-table-toolbar">
    <quick-search-filter :tableName="tableName" />
    <div class="table-filter-container">
      <order-status-filter :table-name="tableName" />
    </div>
    <order-age-filter :table-name="tableName" />
    <installation-age-filter :table-name="tableName" />
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import OrderStatusFilter from '@/containers/OrderStatusFilter';
import OrderAgeFilter from './OrderAgeFilter';
import InstallationAgeFilter from './InstallationAgeFilter';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'OrdersTableToolbar',
  components: {
    QuickSearchFilter,
    OrderStatusFilter,
    OrderAgeFilter,
    InstallationAgeFilter,
  },
  data() {
    return {
      tableName: ENTITY_TYPES.ORDERS,
    };
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
