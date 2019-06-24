<template>
  <div class="disputes-by-submitters-table-toolbar">
    <v-spacer></v-spacer>
    <export-to-csv-file-button
      :tableName="tableName"
      :filters="filters"
      :repository="handlerCsvFile()"
    />
    <fiscal-period-filter :tableName="tableName" />
    <custom-range-filter :tableName="tableName" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CustomRangeFilter from '@/containers/CustomRangeFilter';
import FiscalPeriodFilter from '@/containers/FiscalPeriodFilter';
import ExportToCsvFileButton from '@/containers/ExportToCsvFileButton';
import { getDisputesBySubmittersCsvFile } from '@/services/disputesRepository';

export default {
  name: 'DisputesBySubmittersTableToolbar',
  components: {
    FiscalPeriodFilter,
    CustomRangeFilter,
    ExportToCsvFileButton,
  },
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['tableData']),
    filters() {
      return this.tableData(this.tableName).filters;
    },
  },
  methods: {
    handlerCsvFile() {
      return getDisputesBySubmittersCsvFile;
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
