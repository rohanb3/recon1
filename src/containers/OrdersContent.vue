<template>
  <div class="orders-table" :class="`${this.getTableName}-table`">
    <slot name="toolbar" />
    <lazy-load-table
      :tableName="tableName"
      :item-key-name="columnIdName"
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
import ClaimButtonCell from '@/components/tableCells/ClaimButtonCell';

import { TABLE_COLUMN_ID_NAMES } from '@/constants';

import SelectedRangeFilter from '../components/SelectedRangeFilter';
import TableToolbar from '@/components/TableToolbar';
import CustomRangeFilter from './CustomRangeFilter';
import FiscalPeriodFilter from './FiscalPeriodFilter';

export default {
  name: 'OrdersContent',
  components: {
    FiscalPeriodFilter,
    CustomRangeFilter,
    TableToolbar,
    SelectedRangeFilter,
    LazyLoadTable,
    DefaultCell,
    OrderAgeCell,
    OrderStatusCell,
    OrderNumberCell,
    PriceCell,
    DisputeButtonCell,
    DateYearMonthDayCell,
    ClaimButtonCell,
  },
  props: {
    tableName: {
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
        claimButton: 'ClaimButtonCell',
      },
    };
  },
  computed: {
    ...mapGetters(['tableData', 'scopes']),
    columnIdName() {
      return TABLE_COLUMN_ID_NAMES[this.tableName];
    },
    getTableName() {
      return this.tableName.toLowerCase();
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
        #{$table-header-height-offset} - #{$switcher-height}
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
