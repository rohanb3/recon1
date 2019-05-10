<template>
  <div class="orders-table-toolbar">
    <quick-search-filter :tableName="tableName" />
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'OrdersTableToolbar',
  components: {
    QuickSearchFilter,
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

  .table-filter-container {
    display: flex;

    .table-filter:first-child {
      border-radius: 3px 0 0 3px;
      border-right-color: $table-filter-border-right-color;
    }

    .table-filter:last-child {
      border-radius: 0 3px 3px 0;
    }

    .table-filter:only-of-type {
      border-radius: 3px;
    }
  }
}
</style>
