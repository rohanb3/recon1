<template>
  <div class="disputes-table-toolbar">
    <quick-search-filter :table-name="tableName" :filter-name="quickSearchFilterName" />
    <div class="table-filter-container">
      <installation-age-filter :table-name="tableName" />
      <disput-age-filter :table-name="tableName" />
      <dispute-type-filter :tableName="tableName" />
      <spectrum-dispute-status-filter :tableName="tableName" :filterField="filterField" />
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
import InstallationAgeFilter from '@/containers/InstallationAgeFilter';
import DisputAgeFilter from '@/containers/DisputAgeFilter';
import SpectrumDisputeStatusFilter from '@/containers/SpectrumDisputeStatusFilter';
import FiscalPeriodFilter from '@/containers/FiscalPeriodFilter';
import ExportToCsvFileButton from '@/containers/ExportToCsvFileButton';
import { getDisputesCsvFile } from '@/services/disputesRepository';
import { FILTER_NAMES } from '@/constants';

export default {
  name: 'DisputesResubmissionTableToolbar',
  components: {
    QuickSearchFilter,
    DisputeTypeFilter,
    FiscalPeriodFilter,
    CustomRangeFilter,
    InstallationAgeFilter,
    DisputAgeFilter,
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
      quickSearchFilterName: FILTER_NAMES.SEARCH_DISPUTES,
    };
  },
  computed: {
    ...mapGetters(['tableData']),
    filters() {
      return this.tableData(this.tableName).filters;
    },
    filterField() {
      return FILTER_NAMES.DISPUTE_STATUS_IDS;
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
