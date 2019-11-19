<template>
  <div class="claims-table claims_by_submitters-table">
    <table-toolbar :table-name="tableName" :title="$t('claims.statistics.by.submitters')">
      <claims-by-submitters-table-toolbar :tableName="tableName" slot="filters" />
    </table-toolbar>
    <claims-by-submitters-badges />
    <lazy-load-table :tableName="tableName">
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
        :filter="rowCell.column.filter"
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

import ClaimsBySubmittersTableToolbar from '@/containers/ClaimsBySubmittersTableToolbar';
import ClaimsBySubmittersBadges from '@/containers/ClaimsBySubmittersBadges';

import disputeCommonTable from '@/mixins/disputeCommonTable';

import { TABLE_NAMES } from '@/constants';

import dateRange from '@/filters/boundaries';
import TableToolbar from '../components/TableToolbar';

export default {
  name: 'ClaimsBySubmittersTable',
  components: {
    TableToolbar,
    ClaimsBySubmittersTableToolbar,
    ClaimsBySubmittersBadges,
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
      tableName: TABLE_NAMES.CLAIMS_BY_SUBMITTERS,
      rowComponentsHash: {
        default: 'DefaultCell',
        percent: 'PercentCell',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
.claims_by_submitters-table {
  @include table-base-container;
}

.table-title {
  @include table-base-title;
}
.claims_by_submitters-table /deep/ {
  height: 100%;
  .virtual-list {
    height: 100vh;
    max-height: calc(
      100vh - #{$header-height} - 2 * #{$table-list-padding} - #{$table-toolbar-height} - #{$table-header-height} -
        80px - #{$switcher-height}
    );
  }

  .table__header {
    width: 100%;
  }
}
.selected-date-range {
  @include selected-date-range;
}
</style>
