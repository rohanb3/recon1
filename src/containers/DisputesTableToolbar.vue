<template>
  <div class="disputes-table-toolbar">
    <quick-search-disputes-filter :tableName="tableName" />
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import QuickSearchDisputesFilter from '@/containers/QuickSearchDisputesFilter';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'DisputesTableToolbar',
  components: {
    QuickSearchDisputesFilter,
  },
  data() {
    return {
      tableName: ENTITY_TYPES.DISPUTES,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.disputes-table-toolbar {
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
