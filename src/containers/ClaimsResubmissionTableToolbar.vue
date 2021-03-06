<template>
  <div class="disputes-table-toolbar">
    <quick-search-filter :table-name="tableName" />
    <div class="table-filter-container">
      <order-age-filter :table-name="tableName" />
      <claims-age-filter :table-name="tableName" />
      <claim-types-filter :tableName="tableName" />
      <spectrum-dispute-status-filter
        :table-name="tableName"
        :title="$t('disputes.claims.status')"
        :filter-field="filterField"
      />
    </div>
    <v-spacer></v-spacer>
    <div class="table-filter-container">
      <export-to-csv-file-button
        :tableName="tableName"
        :filters="filters"
        :repository="handlerCsvFile()"
      />
      <fiscal-period-filter :tableName="tableName" />
      <custom-range-filter :tableName="tableName" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuickSearchFilter from '@/containers/QuickSearchFilter';
import CustomRangeFilter from '@/containers/CustomRangeFilter';
import ClaimTypesFilter from '@/containers/ClaimTypesFilter';
import OrderAgeFilter from '@/containers/OrderAgeFilter';
import ClaimsAgeFilter from '@/containers/ClaimsAgeFilter';
import SpectrumDisputeStatusFilter from '@/containers/SpectrumDisputeStatusFilter';
import FiscalPeriodFilter from '@/containers/FiscalPeriodFilter';
import ExportToCsvFileButton from '@/containers/ExportToCsvFileButton';
import { getClaimsResubmittionCsvFile } from '@/services/disputesRepository';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'ClaimsResubmissionTableToolbar',
  components: {
    QuickSearchFilter,
    ClaimTypesFilter,
    FiscalPeriodFilter,
    CustomRangeFilter,
    OrderAgeFilter,
    ClaimsAgeFilter,
    SpectrumDisputeStatusFilter,
    ExportToCsvFileButton,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      quickSearchFilterName: FILTER_NAMES.SEARCH,
    };
  },
  computed: {
    ...mapGetters(['tableData']),
    filters() {
      return this.tableData(this.tableName).filters;
    },
    filterField() {
      return FILTER_NAMES.CLAIMS_STATUS_IDS;
    },
  },
  methods: {
    handlerCsvFile() {
      return getClaimsResubmittionCsvFile;
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
