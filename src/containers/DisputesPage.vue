<template>
  <div class="disputes-table">
    <div class="table-toolbar">
      <div class="table-title">{{ $t('disputes.title') }}</div>
      <disputes-table-toolbar :tableName="tableName" @exportToCsvFile="onExportToCsvFile" />
    </div>
    <div class="selected-date-range" v-show="isSelectedDateRange">
      {{ $t('selected.date.range') }}{{ selectedDateRange | dateRange({ prefix: ': ' }) }}
    </div>
    <lazy-load-table :tableName="tableName">
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
        :filter="rowCell.column.filter"
        @changeDisputeStatus="onChangeDisputeStatus"
        @selectId="onSelectIdDispute"
      />
    </lazy-load-table>

    <dispute-history
      v-if="disputeHistoryShown"
      :parent-table-name="tableName"
      @close="disputeHistoryShown = false"
    />
  </div>
</template>

<script>
import DisputesTableToolbar from '@/containers/DisputesTableToolbar';
import disputeCommonTable from '@/mixins/disputeCommonTable';
import XYZStatusCell from '@/components/tableCells/XYZStatusCell';

import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'DisputesPage',
  components: {
    DisputesTableToolbar,
    XYZStatusCell,
  },
  mixins: [disputeCommonTable],
  data() {
    return {
      tableName: ENTITY_TYPES.DISPUTES,
      rowComponentsHash: {
        xyzStatus: 'XYZStatusCell',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
.disputes-table {
  @include table-base-container;
}
.table-toolbar {
  @include table-base-toolbar;
}
.table-title {
  @include table-base-title;
}
.disputes-table /deep/ {
  height: 100%;
  .virtual-list {
    height: 100vh;
    max-height: calc(
      100vh - #{$header-height} - 2 * #{$table-list-padding} - #{$table-toolbar-height} - #{$table-header-height}
    );
  }
}
.grey-text-cell {
  .row-cell {
    color: $base-text-color;
    opacity: 0.6;
  }
}

.selected-date-range {
  @include selected-date-range;
}
</style>
