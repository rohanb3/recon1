<template>
  <div class="disputes-table-toolbar">
    <quick-search-filter :table-name="tableName" :filter-name="quickSearchFilterName" />
    <div class="table-filter-container">
      <order-age-filter :table-name="tableName" />
      <disput-age-filter :table-name="tableName" />
      <dispute-type-filter :tableName="tableName" />
      <dispute-status-filter :tableName="tableName" send-field-name="ids" />
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
import DisputeTypeFilter from '@/containers/DisputeTypeFilter';
import OrderAgeFilter from '@/containers/AgeFilters/OrderAgeFilter';
import DisputAgeFilter from '@/containers/AgeFilters/DisputAgeFilter';
import DisputeStatusFilter from '@/containers/DisputeStatusFilter';
import FiscalPeriodFilter from '@/containers/FiscalPeriodFilter';
import ExportToCsvFileButton from '@/containers/ExportToCsvFileButton';
import { getDisputesCsvFile } from '@/services/disputesRepository';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'ResubmissionTableToolbar',
  components: {
    QuickSearchFilter,
    DisputeTypeFilter,
    FiscalPeriodFilter,
    CustomRangeFilter,
    OrderAgeFilter,
    DisputAgeFilter,
    DisputeStatusFilter,
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
      quickSearchFilterName: FILTER_NAMES.SEARCH_DISPUTES,
    };
  },
  computed: {
    ...mapGetters(['tableData']),
    filters() {
      return this.tableData(this.tableName).filters;
    },
  },
  methods: {
    handlerCsvFile() {
      return getDisputesCsvFile;
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
