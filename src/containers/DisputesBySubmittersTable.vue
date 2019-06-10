<template>
  <div class="disputes-table disputes_by_submitters-table">
    <div class="table-toolbar">
      <div class="table-title">{{ $t('disputes.statistics.by.submitters') }}</div>
      <disputes-by-submitters-table-toolbar
        :tableName="tableName"
        @exportToCsvFile="onExportToCsvFile"
      />
    </div>
    <div class="selected-date-range" v-show="isSelectedDateRange">
      {{ $t('selected.date.range') }}{{ selectedDateRange | dateRange({ prefix: ': ' }) }}
    </div>
    <disputes-by-submitters-badges />
    <lazy-load-table :tableName="tableName">
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
        :filter="rowCell.column.filter"
        @changeDisputeStatus="changeDisputeStatus"
        @confirmApproveDisputeStatus="onConfirmApproveDisputeStatus"
        @confirmRejectDisputeStatus="onConfirmRejectDisputeStatus"
        @selectId="onSelectIdDispute"
      />
    </lazy-load-table>
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import SortingHeaderCell from '@/components/tableHeaderCells/SortingHeaderCell';
import DefaultCell from '@/components/tableCells/DefaultCell';
import PercentCell from '@/components/tableCells/PercentCell';

import DisputesBySubmittersTableToolbar from '@/containers/DisputesBySubmittersTableToolbar';
import DisputesBySubmittersBadges from '@/containers/DisputesBySubmittersBadges';

import { getDisputesBySubmittersCsvFile } from '@/services/disputesRepository';

import disputeCommonTable from '@/mixins/disputeCommonTable';

import { ENTITY_TYPES } from '@/constants';
import { generateCSVFile } from '@/services/utils';

import dateRange from '@/filters/boundaries';

export default {
  name: 'DisputesBySubmittersTable',
  components: {
    DisputesBySubmittersTableToolbar,
    DisputesBySubmittersBadges,
    WombatTable,
    WombatRow,
    TableLoader,
    DefaultCell,
    DefaultHeaderCell,
    SortingHeaderCell,
    PercentCell,
  },
  filters: {
    dateRange,
  },
  mixins: [disputeCommonTable],
  data() {
    return {
      tableName: ENTITY_TYPES.DISPUTES_BY_SUBMITTERS,
      rowComponentsHash: {
        default: 'DefaultCell',
        percent: 'PercentCell',
      },
    };
  },
  methods: {
    async onExportToCsvFile() {
      const CSVFile = await getDisputesBySubmittersCsvFile(this.filters);
      generateCSVFile(CSVFile, this.tableName);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
.disputes_by_submitters-table {
  @include table-base-container;
}
.table-toolbar {
  @include table-base-toolbar;
}
.table-title {
  @include table-base-title;
}
.disputes_by_submitters-table /deep/ {
  height: 100%;
  .virtual-list {
    height: 100vh;
    max-height: calc(
      100vh - #{$header-height} - 2 * #{$table-list-padding} - #{$table-toolbar-height} - #{$table-header-height}
    );
  }
}
.selected-date-range {
  @include selected-date-range;
}
</style>
