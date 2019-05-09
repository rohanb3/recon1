<template>
  <div class="orders-table">
    <div class="table-toolbar">
      <div class="table-title">{{ $t('orders.select.order') }}</div>
      <orders-table-toolbar />
    </div>
    <wombat-table
      :items="rows"
      :columns="columns"
      :item-height="50"
      :infinite-loading="!allItemsLoaded"
      :item-key-name="сolumnIdName"
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
import OrderNumberCell from '@/components/tableCells/OrderNumberCell';
import PriceCell from '@/components/tableCells/PriceCell';
import DisputeButtonCell from '@/components/tableCells/DisputeButtonCell';

import OrdersTableToolbar from '@/containers/OrdersTableToolbar';

import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';

import { ENTITY_TYPES, TABLE_СOLUMN_ID_NAMES } from '@/constants';

export default {
  name: 'OrdersPage',
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
    OrderNumberCell,
    PriceCell,
    DisputeButtonCell,
  },
  mixins: [configurableColumnsTable, lazyLoadTable],
  data() {
    return {
      tableName: ENTITY_TYPES.ORDERS,
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
        orderNumber: 'OrderNumberCell',
        price: 'PriceCell',
        disputeButton: 'DisputeButtonCell',
      },
    };
  },
  computed: {
    сolumnIdName() {
      return TABLE_СOLUMN_ID_NAMES[this.tableName];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.orders-table {
  @include table-base-container;
}

.table-toolbar {
  @include table-base-toolbar;
}

.table-title {
  @include table-base-title;
}

.orders-table {
  @extend %blurred-this;
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
