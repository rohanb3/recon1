<template>
  <div class="companies-table-toolbar">
    <quick-search-filter :tableName="tableName" />
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import { ORDERS } from '@/constants/entityTypes';

export default {
  name: 'OrdersTableToolbar',
  components: {
    QuickSearchFilter,
  },
  data() {
    return {
      tableName: ORDERS,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.companies-table-toolbar {
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
