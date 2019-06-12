<template>
  <div class="disputes-table-toolbar">
    <quick-search-disputes-filter :tableName="tableName" />
    <div class="table-filter-container">
      <order-age-filter :table-name="tableName" />
      <disput-age-filter :table-name="tableName" />
      <dispute-type-filter :tableName="tableName" />
      <dispute-xyz-status-filter :tableName="tableName" send-field-name="ids" />
      <dispute-status-filter :tableName="tableName" />
    </div>
    <v-spacer></v-spacer>
    <div class="table-filter-container">
      <table-button :title="$t('export')" @click="$emit('exportToCsvFile')" />
      <fiscal-period-filter :tableName="tableName" />
      <custom-range-filter :tableName="tableName" />
    </div>
  </div>
</template>

<script>
import QuickSearchDisputesFilter from '@/containers/QuickSearchDisputesFilter';
import CustomRangeFilter from '@/containers/CustomRangeFilter';
import DisputeTypeFilter from '@/containers/DisputeTypeFilter';
import OrderAgeFilter from '@/containers/OrderAgeFilter';
import DisputAgeFilter from '@/containers/DisputAgeFilter';
import DisputeXyzStatusFilter from '@/containers/DisputeXyzStatusFilter';
import DisputeStatusFilter from '@/containers/DisputeStatusFilter';
import TableButton from '@/components/TableButton';
import FiscalPeriodFilter from '@/containers/FiscalPeriodFilter';

export default {
  name: 'DisputesTableToolbar',
  components: {
    QuickSearchDisputesFilter,
    DisputeTypeFilter,
    TableButton,
    FiscalPeriodFilter,
    CustomRangeFilter,
    OrderAgeFilter,
    DisputAgeFilter,
    DisputeXyzStatusFilter,
    DisputeStatusFilter,
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

.disputes-table-toolbar {
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
