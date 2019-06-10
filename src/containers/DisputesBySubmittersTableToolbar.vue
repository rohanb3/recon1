<template>
  <div class="disputes-by-submitters-table-toolbar">
    <v-spacer></v-spacer>
    <table-button :title="$t('export')" @click="$emit('exportToCsvFile')" />
    <fiscal-period-filter :tableName="tableName" />
    <custom-range-filter :tableName="tableName" />
  </div>
</template>

<script>
import CustomRangeFilter from '@/containers/CustomRangeFilter';
import TableButton from '@/components/TableButton';
import FiscalPeriodFilter from '@/containers/FiscalPeriodFilter';

export default {
  name: 'DisputesBySubmittersTableToolbar',
  components: {
    TableButton,
    FiscalPeriodFilter,
    CustomRangeFilter,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.disputes-by-submitters-table-toolbar {
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
}
</style>
