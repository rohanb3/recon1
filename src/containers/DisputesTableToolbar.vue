<template>
  <div class="disputes-table-toolbar">
    <quick-search-disputes-filter :tableName="tableName" />
    <div class="table-filter-container">
      <dispute-type-filter :tableName="tableName" />
      <order-age-filter :table-name="tableName" />
      <installation-age-filter :table-name="tableName" />
      <disput-age-filter :table-name="tableName" />
      <dispute-xyz-status-filter :tableName="tableName" send-field-name="ids" />
      <dispute-status-filter :tableName="tableName" />
    </div>
    <v-spacer></v-spacer>
    <custome-range-filter :tableName="tableName" />
    <table-button :title="$t('export')" @click="$emit('exportToCsvFile')" />
  </div>
</template>

<script>
import QuickSearchDisputesFilter from '@/containers/QuickSearchDisputesFilter';
import CustomeRangeFilter from '@/containers/CustomeRangeFilter';
import DisputeTypeFilter from '@/containers/DisputeTypeFilter';
import OrderAgeFilter from '@/containers/OrderAgeFilter';
import DisputAgeFilter from '@/containers/DisputAgeFilter';
import InstallationAgeFilter from '@/containers/InstallationAgeFilter';
import DisputeXyzStatusFilter from '@/containers/DisputeXyzStatusFilter';
import DisputeStatusFilter from '@/containers/DisputeStatusFilter';
import TableButton from '@/components/TableButton';

export default {
  name: 'DisputesTableToolbar',
  components: {
    QuickSearchDisputesFilter,
    DisputeTypeFilter,
    TableButton,
    CustomeRangeFilter,
    OrderAgeFilter,
    InstallationAgeFilter,
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

  .quick-search {
    flex: 0;
  }
}

.table-filter-container /deep/ {
  @include table-filter-container;
}
</style>
