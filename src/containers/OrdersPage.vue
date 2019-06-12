<template>
  <div class="orders-table" v-if="isShowOrder">
    <div class="table-toolbar">
      <div class="table-title">{{ $t('orders.select.order') }}</div>
      <orders-table-toolbar
        :table-name="tableName"
        @exportToCsvFile="onExportToCsvFile"
        @syncOrders="onSyncOrders"
      />
    </div>
    <selected-range-filter :table-name="tableName" />
    <lazy-load-table :table-name="tableName" :item-key-name="columnIdName" :columns="columns">
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
        :scopes="scopes"
      />
    </lazy-load-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import LazyLoadTable from '@/containers/LazyLoadTable';
import DefaultCell from '@/components/tableCells/DefaultCell';
import OrderStatusCell from '@/components/tableCells/OrderStatusCell';
import OrderAgeCell from '@/components/tableCells/OrderAgeCell';
import OrderNumberCell from '@/components/tableCells/OrderNumberCell';
import PriceCell from '@/components/tableCells/PriceCell';
import DisputeButtonCell from '@/components/tableCells/DisputeButtonCell';
import DateYearMonthDayCell from '@/components/tableCells/DateYearMonthDayCell';

import OrdersTableToolbar from '@/containers/OrdersTableToolbar';

import { ENTITY_TYPES, TABLE_COLUMN_ID_NAMES } from '@/constants';
import { getOrdersCsvFile } from '@/services/ordersRepository';
import { generateCSVFile } from '@/services/utils';

import { START_SYNC_ORDERS } from '@/store/storage/actionTypes';

import { successMessage } from '@/services/notifications';
import SelectedRangeFilter from '../components/SelectedRangeFilter';

export default {
  name: 'OrdersPage',
  components: {
    SelectedRangeFilter,
    LazyLoadTable,
    DefaultCell,
    OrdersTableToolbar,
    OrderAgeCell,
    OrderStatusCell,
    OrderNumberCell,
    PriceCell,
    DisputeButtonCell,
    DateYearMonthDayCell,
  },
  data() {
    return {
      tableName: ENTITY_TYPES.ORDERS,
      rowComponentsHash: {
        default: 'DefaultCell',
        creationAge: 'OrderAgeCell',
        orderStatus: 'OrderStatusCell',
        orderNumber: 'OrderNumberCell',
        price: 'PriceCell',
        disputeButton: 'DisputeButtonCell',
        dateYearMonthDay: 'DateYearMonthDayCell',
      },
    };
  },
  computed: {
    ...mapGetters([
      'isShowOrderWithoutExpectedComission',
      'isShowOrderWithExpectedComission',
      'tableData',
      'scopes',
    ]),
    isShowOrder() {
      return this.isShowOrderWithoutExpectedComission || this.isShowOrderWithExpectedComission;
    },
    columnIdName() {
      return TABLE_COLUMN_ID_NAMES[this.tableName];
    },
    columns() {
      return this.tableData(this.tableName).columns.filter(
        column => column.name !== 'expectedCommission' || this.isShowOrderWithExpectedComission
      );
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
