<template>
  <table-full-height-balloon class="dispute-history" @close="close">
    <div class="additional-info">
      <span class="dispute-id">{{ $t('dispute.id') }}: {{ disputeId }}</span>
      <span class="order-number">{{ $t('orders.number') }}: {{ orderId }}</span>
    </div>
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
import StatusDescriptionCell from '@/components/tableCells/StatusDescriptionCell';
import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import { ENTITY_TYPES, FILTER_NAMES } from '@/constants';

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
    StatusDescriptionCell,
  },
  props: {
    parentTableName: {
      type: String,
      required: true,
    },
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
        statusDescription: 'StatusDescriptionCell',
      },
    };
  },
  computed: {
    disputeId() {
      return this.filters[FILTER_NAMES.DISPUTE_ID];
    },
    selectedDispute() {
      return this.$store.getters.getItemById(this.disputeId, this.parentTableName) || {};
    },
    orderId() {
      return this.selectedDispute.orderNumber;
    },
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
  color: $base-text-color;
  font-size: 14px;
  font-weight: 500;
  .text-style-italic-cell {
    font-style: italic;
    color: $base-text-color;
  }
  .additional-info {
    display: flex;
    font-size: 14px;
    font-weight: bold;
    height: 51px;
    .dispute-id,
    .order-number {
      background: $base-blue;
      color: $base-white;
      line-height: 51px;
      padding: 0 12px;
    }
    .order-number {
      margin-left: 12px;
    }
  }
}
.inputs-wrapper {
  margin-top: 50px;
}
</style>
