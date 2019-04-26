<template>
  <div class="orders-table">
    <div class="table-toolbar">
      <div class="table-title">{{ $t('orders.select.order') }}</div>
      <orders-table-toolbar />
    </div>
    <wombat-table
      :items="rowsWithId"
      :columns="columns"
      :item-height="50"
      :infinite-loading="!allItemsLoaded"
      @bottomReached="checkAndLoadItems"
      @columnsResized="onColumnsResized"
      @columnsReordered="onColumnsReordered"
    >
      <component
        slot="header-cell"
        slot-scope="headerCell"
        class="header-cell"
        :is="
          headerComponentsHash[headerCell.column.fieldHeaderType] || headerComponentsHash.default
        "
        :column="headerCell.column"
        :sortingField="sortingField"
        :sortDirection="sortDirection"
        @sortDirectionChanged="onSortDirectionChanged"
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
    <v-progress-circular
      v-if="applyingFilters"
      class="big-spinner"
      :size="70"
      :width="7"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';
import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import SortingHeaderCell from '@/components/tableHeaderCells/SortingHeaderCell';
import DefaultCell from '@/components/tableCells/DefaultCell';
import OrderDifferenceCell from '@/components/tableCells/OrderDifferenceCell';
import OrderStatusCell from '@/components/tableCells/OrderStatusCell';
import OrderAgeCell from '@/components/tableCells/OrderAgeCell';

import OrdersTableToolbar from '@/containers/OrdersTableToolbar';

import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';

import { ORDERS } from '@/constants/entityTypes';

export default {
  name: 'SelectOrderPage',
  components: {
    WombatTable,
    WombatRow,
    TableLoader,
    DefaultCell,
    DefaultHeaderCell,
    SortingHeaderCell,
    OrdersTableToolbar,
    OrderDifferenceCell,
    OrderAgeCell,
    OrderStatusCell,
  },
  mixins: [configurableColumnsTable, lazyLoadTable],
  data() {
    return {
      tableName: ORDERS,
      headerComponentsHash: {
        default: 'DefaultHeaderCell',
        sortingHeader: 'SortingHeaderCell',
      },
      rowComponentsHash: {
        default: 'DefaultCell',
        orderDifference: 'OrderDifferenceCell',
        creationAge: 'OrderAgeCell',
        installationAge: 'OrderAgeCell',
        orderStatus: 'OrderStatusCell',
      },
    };
  },
  computed: {
    rowsWithId() {
      return this.rows.map(item => ({ ...item, id: item.orderId }));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.orders-table {
  @include table-base-container;
}

.table-toolbar {
  @include table-base-toolbar;
}

.table-title {
  @include table-base-title;
}

.orders-table /deep/ {
  height: 95vh;
  margin: 20px;

  .virtual-list {
    height: 100vh;
    max-height: calc(
      100vh - #{$header-height} - 2 * #{$table-list-padding} - #{$table-toolbar-height} - #{$table-header-height}
    );
  }
}
</style>
