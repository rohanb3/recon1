<template>
  <table-full-height-balloon class="dispute-history" @close="close">
    <div class="inputs-wrapper">
      <wombat-table
        :items="rows"
        :columns="columns"
        :item-height="50"
        :infinite-loading="!allItemsLoaded"
        :loading-items="loading"
        :name="tableName"
        @bottomReached="checkAndLoadItems"
        @columnsResized="onColumnsResized"
        @columnsReordered="onColumnsReordered"
      >
        <component
          slot="header-cell"
          slot-scope="headerCell"
          class="header-cell"
          :is="headerComponentsHash.default"
          :column="headerCell.column"
        />
        <div
          v-if="rows && rows.length"
          slot="row"
          slot-scope="row"
          :class="{ blurred: applyingFilters }"
        >
          <wombat-row :item="row.item" :columns="row.columns" :height="row.item.height">
            <component
              slot="row-cell"
              slot-scope="rowCell"
              class="row-cell"
              :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
              :item="rowCell.item"
              :column="rowCell.column"
            />
          </wombat-row>
        </div>
        <table-loader v-if="loading" slot="loader" />
      </wombat-table>
    </div>
  </table-full-height-balloon>
</template>

<script>
import TableFullHeightBalloon from '@/components/TableFullHeightBalloon';
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import SortingHeaderCell from '@/components/tableHeaderCells/SortingHeaderCell';
import DefaultCell from '@/components/tableCells/DefaultCell';
import DayMonthYearTimeCell from '@/components/tableCells/DayMonthYearTimeCell';

import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'DisputeHistory',
  components: {
    WombatTable,
    WombatRow,
    TableLoader,
    DefaultCell,
    DefaultHeaderCell,
    SortingHeaderCell,
    TableFullHeightBalloon,
    DayMonthYearTimeCell,
  },
  mixins: [configurableColumnsTable, lazyLoadTable],
  data() {
    return {
      tableName: ENTITY_TYPES.DISPUTE_HISTORY,
      headerComponentsHash: {
        default: 'DefaultHeaderCell',
      },
      rowComponentsHash: {
        default: 'DefaultCell',
        dayMonthYearTime: 'DayMonthYearTimeCell',
      },
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.dispute-history {
  min-width: 672px;
  background-color: $base-white;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  padding: 20px;
  color: $base-text-color;
  font-size: 14px;
  font-weight: 500;

  .text-style-italic-cell {
    font-style: italic;
    color: $base-text-color;
  }
}

.inputs-wrapper {
  margin-top: 50px;
}
</style>
