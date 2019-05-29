<template>
  <div class="disputes-table-toolbar">
    <quick-search-disputes-filter :tableName="tableName" />
    <div class="table-filter-container">
      <order-age-filter :table-name="tableName" />
      <installation-age-filter :table-name="tableName" />
      <disput-age-filter :table-name="tableName" />
      <dispute-type-filter :tableName="tableName" />
      <dispute-xyz-status-filter
        v-if="isDisputesTable"
        :tableName="tableName"
        send-field-name="ids"
      />
      <dispute-status-filter :tableName="tableName" />
    </div>
    <v-spacer></v-spacer>
    <custom-range-filter :tableName="tableName" />
    <table-button :title="$t('export')" @click="$emit('exportToCsvFile')" />
  </div>
</template>

<script>
import QuickSearchDisputesFilter from '@/containers/QuickSearchDisputesFilter';
import CustomRangeFilter from '@/containers/CustomRangeFilter';
import DisputeTypeFilter from '@/containers/DisputeTypeFilter';
import OrderAgeFilter from '@/containers/OrderAgeFilter';
import DisputAgeFilter from '@/containers/DisputAgeFilter';
import InstallationAgeFilter from '@/containers/InstallationAgeFilter';
import DisputeXyzStatusFilter from '@/containers/DisputeXyzStatusFilter';
import DisputeStatusFilter from '@/containers/DisputeStatusFilter';
import TableButton from '@/components/TableButton';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'DisputesTableToolbar',
  components: {
    QuickSearchDisputesFilter,
    DisputeTypeFilter,
    TableButton,
    CustomRangeFilter,
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
  computed: {
    isDisputesTable() {
      return ENTITY_TYPES.DISPUTES === this.tableName;
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
