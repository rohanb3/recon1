<template>
  <table-toolbar :title="$t('claim.title')" :table-name="tableName">
    <selected-range-filter slot="toolbar-info" :tableName="tableName" />
    <div slot="filters" class="orders-table-toolbar">
      <quick-search-filter :table-name="tableName" :filter-name="quickSearchFilterName" />
      <div class="table-filter-container">
        <order-age-filter :table-name="tableName" />
        <claims-age-filter :table-name="tableName" />
        <claim-types-filter :table-name="tableName" />
        <claims-xyz-status-filter :table-name="tableName" />
        <spectrum-dispute-status-filter :table-name="tableName" :filter-field="filterField" />
      </div>
      <v-spacer></v-spacer>
      <div class="table-filter-container">
        <export-to-cvs-disputes-claims :table-name="tableName" />
        <fiscal-period-filter :table-name="tableName" />
        <custom-range-filter :table-name="tableName" />
      </div>
    </div>
  </table-toolbar>
</template>

<script>
import TableToolbar from '@/components/TableToolbar';
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import OrderAgeFilter from '@/containers/OrderAgeFilter';
import FiscalPeriodFilter from './FiscalPeriodFilter';
import CustomRangeFilter from './CustomRangeFilter';
import SelectedRangeFilter from '@/components/SelectedRangeFilter';
import { FILTER_NAMES } from '@/constants';
import ClaimsAgeFilter from './ClaimsAgeFilter';
import ClaimTypesFilter from './ClaimTypesFilter';
import ClaimsXyzStatusFilter from './ClaimsXyzStatusFilter';
import SpectrumDisputeStatusFilter from './SpectrumDisputeStatusFilter';
import ExportToCvsDisputesClaims from './ExportToCvsDisputesClaims';

export default {
  name: 'ClaimsListToolbar',
  props: ['tableName'],
  components: {
    ExportToCvsDisputesClaims,
    SpectrumDisputeStatusFilter,
    ClaimsXyzStatusFilter,
    ClaimTypesFilter,
    ClaimsAgeFilter,
    CustomRangeFilter,
    FiscalPeriodFilter,
    QuickSearchFilter,
    OrderAgeFilter,
    TableToolbar,
    SelectedRangeFilter,
  },
  computed: {
    quickSearchFilterName() {
      return FILTER_NAMES.SEARCH_DISPUTES;
    },
    filterField() {
      return FILTER_NAMES.CLAIMS_STATUS_IDS;
    },
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
  align-items: center;

  .quick-search {
    flex: 0;
  }
}

.table-filter-container /deep/ {
  @include table-filter-container;
  flex-wrap: wrap;
}
</style>
