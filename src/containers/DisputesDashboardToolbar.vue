<template>
  <v-container fluid grid-list-md class="disputes-dashboard-toolbar">
    <div class="table-filter-container">
      <installation-age-filter :table-name="tableName" />
      <disput-age-filter :table-name="tableName" />
    </div>
    <v-spacer />
    <div class="table-filter-container">
      <fiscal-period-filter :tableName="tableName" />
      <custom-range-filter :tableName="tableName" />
    </div>
  </v-container>
</template>

<script>
import FiscalPeriodFilter from '@/containers/FiscalPeriodFilter';
import CustomRangeFilter from '@/containers/CustomRangeFilter';
import InstallationAgeFilter from '@/containers/InstallationAgeFilter';
import DisputAgeFilter from '@/containers/DisputAgeFilter';

export default {
  name: 'DisputesDashboardToolbar',
  components: {
    InstallationAgeFilter,
    DisputAgeFilter,
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
@import '@/assets/styles/mixins.scss';

.disputes-dashboard-toolbar {
  align-items: center;
  display: flex;
  flex: 1;
  padding-top: 18px;
  padding-right: 0;

  .table-title {
    font-size: 20px;
    font-weight: bold;
    color: $base-text-color;
  }

  .table-filter-container {
    display: flex;
    padding-left: 10px;
  }
}

.table-filter-container /deep/ {
  @include table-filter-container;
}
</style>
