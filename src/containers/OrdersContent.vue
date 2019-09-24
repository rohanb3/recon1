<template>
  <div class="orders-table" :class="`${this.tableName.toLowerCase()}-table`" v-if="isShowOrder">
    <table-toolbar :title="$t(toolbarTitle)" :table-name="tableName">
      <orders-table-toolbar :table-name="tableName" @syncOrders="onSyncOrders" slot="filters" />
    </table-toolbar>
    <lazy-load-table
      :tableName="tableName"
      :item-key-name="columnIdName"
      :columns="columns"
      :resetDataBeforeLeave="false"
    >
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

import { TABLE_COLUMN_ID_NAMES } from '@/constants';

import { START_SYNC_ORDERS } from '@/store/storage/actionTypes';

import { successMessage } from '@/services/notifications';
import SelectedRangeFilter from '../components/SelectedRangeFilter';
import TableToolbar from '@/components/TableToolbar';

export default {
  name: 'OrdersContent',
  components: {
    TableToolbar,
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
  props: {
    tableName: {
      type: String,
      required: true,
    },
    toolbarTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rowComponentsHash: {
        default: 'DefaultCell',
        creationAge: 'OrderAgeCell',
        orderStatus: 'OrderStatusCell',
        orderNumber: 'OrderNumberCell',
        price: 'PriceCell',
        disputeButton: 'DisputeButtonCell',
        dateYearMonthDay: 'DateYearMonthDayCell',
        installationAge: 'OrderAgeCell',
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
      return this.tableData(this.tableName).columns;
    },
  },
  methods: {
    onSyncOrders() {
      this.$store.dispatch(START_SYNC_ORDERS);
      successMessage('sync.started', 'sync.info');
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

.orders-table {
  @extend %blurred-this;
}

.orders-table /deep/ {
  height: 100%;
  .virtual-list {
    height: 100vh;
    max-height: calc(
      100vh - #{$header-height} - 2 * #{$table-list-padding} - #{$table-toolbar-height} - #{$table-header-height} -
        #{$table-header-height-offset}
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