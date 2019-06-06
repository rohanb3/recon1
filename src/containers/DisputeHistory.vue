<template>
  <table-full-height-balloon class="dispute-history" @close="close">
    <div class="additional-info">
      <span class="dispute-id">{{ $t('dispute.id') }}: {{ disputeId }}</span>
      <span class="order-number">{{ $t('orders.number') }}: {{ orderId }}</span>
    </div>
    <div class="inputs-wrapper">
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
  </table-full-height-balloon>
</template>

<script>
import LazyLoadTable from '@/containers/LazyLoadTable';
import TableFullHeightBalloon from '@/components/TableFullHeightBalloon';
import DefaultCell from '@/components/tableCells/DefaultCell';
import { ENTITY_TYPES, FILTER_NAMES } from '@/constants';

export default {
  name: 'DisputeHistory',
  components: {
    LazyLoadTable,
    DefaultCell,
    TableFullHeightBalloon,
  },
  props: {
    parentTableName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tableName: ENTITY_TYPES.DISPUTE_HISTORY,
      rowComponentsHash: {
        default: 'DefaultCell',
      },
    };
  },
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    disputeId() {
      return this.filters[FILTER_NAMES.DISPUTE_ID];
    },
    selectedDispute() {
      return (
        this.$store.getters.getItemById(this.disputeId, this.parentTableName, item => item.id) || {}
      );
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

.dispute-history /deep/ {
  .text-italic {
    .row-cell {
      font-style: italic;
    }
  }

  .date-cell {
    .row-cell {
      opacity: 0.56;
      color: $base-text-color;
    }
  }
}

.inputs-wrapper {
  margin-top: 50px;
}
</style>
