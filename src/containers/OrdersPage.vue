<template>
  <div class="orders-table">
    <div class="table-toolbar">
      <div class="table-title">{{ $t('orders.select.order') }}</div>
      <orders-table-toolbar
        :tableName="tableName"
        @exportToCsvFile="onExportToCsvFile"
        @syncOrders="onSyncOrders"
      />
    </div>
    <selected-filter-range :tableName="tableName" />
    <lazy-load-table :tableName="tableName" :item-key-name="columnIdName">
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
      />
    </lazy-load-table>
  </div>
</template>

<script>
import LazyLoadTable from '@/containers/LazyLoadTable';
import DefaultCell from '@/components/tableCells/DefaultCell';
import DifferenceComissonCell from '@/components/tableCells/DifferenceComissonCell';
import OrderStatusCell from '@/components/tableCells/OrderStatusCell';
import OrderAgeCell from '@/components/tableCells/OrderAgeCell';
import OrderNumberCell from '@/components/tableCells/OrderNumberCell';
import PriceCell from '@/components/tableCells/PriceCell';
import DisputeButtonCell from '@/components/tableCells/DisputeButtonCell';
import RecievedComissonCell from '@/components/tableCells/RecievedComissonCell';
import DateYearMonthDayCell from '@/components/tableCells/DateYearMonthDayCell';

import OrdersTableToolbar from '@/containers/OrdersTableToolbar';

import { ENTITY_TYPES, TABLE_COLUMN_ID_NAMES } from '@/constants';
import { getOrdersCsvFile } from '@/services/ordersRepository';
import { generateCSVFile } from '@/services/utils';

import { START_SYNC_ORDERS } from '@/store/storage/actionTypes';

import { successMessage } from '@/services/notifications';

import SelectedFilterRange from '../components/SelectedFilterRange';

export default {
  name: 'OrdersPage',
  components: {
    SelectedFilterRange,
    LazyLoadTable,
    DefaultCell,
    OrdersTableToolbar,
    DifferenceComissonCell,
    OrderAgeCell,
    OrderStatusCell,
    OrderNumberCell,
    PriceCell,
    DisputeButtonCell,
    RecievedComissonCell,
    DateYearMonthDayCell,
  },
  data() {
    return {
      tableName: ENTITY_TYPES.ORDERS,
      rowComponentsHash: {
        default: 'DefaultCell',
        differenceComisson: 'DifferenceComissonCell',
        creationAge: 'OrderAgeCell',
        installationAge: 'OrderAgeCell',
        orderStatus: 'OrderStatusCell',
        orderNumber: 'OrderNumberCell',
        price: 'PriceCell',
        recievedComisson: 'RecievedComissonCell',
        disputeButton: 'DisputeButtonCell',
        orderDifference: 'DifferenceComissonCell',
        dateYearMonthDay: 'DateYearMonthDayCell',
      },
    };
  },
  computed: {
    columnIdName() {
      return TABLE_COLUMN_ID_NAMES[this.tableName];
    },
  },
  methods: {
    onSyncOrders() {
      this.$store.dispatch(START_SYNC_ORDERS);
      successMessage('sync.started', 'sync.info');
    },
    async onExportToCsvFile() {
      const CSVFile = await getOrdersCsvFile(this.filters);
      generateCSVFile(CSVFile, this.tableName);
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
</style>
