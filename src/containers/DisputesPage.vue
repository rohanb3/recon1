<template>
  <div class="disputes-table">
    <table-toolbar :title="$t('disputes.title')" :table-name="tableName">
      <disputes-table-toolbar
        :tableName="tableName"
        @exportToCsvFile="onExportToCsvFile"
        slot="filters"
      />
    </table-toolbar>
    <lazy-load-table :tableName="tableName">
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
        :filter="rowCell.column.filter"
        @confirmDisputeStatus="onConfirmDisputeStatus"
        @confirmResubmitDisputeStatus="onConfirmResubmitDisputeStatus"
        @selectId="onSelectIdDispute"
      />
    </lazy-load-table>
    <confirm-resubmit-dispute-popup
      :visible-popup="isShowResubmitConfirmationPopup"
      :dispute-info="selectedDispute"
      @save="changeDisputeStatus"
      @close="isShowResubmitConfirmationPopup = false"
    />
    <confirm-dispute-popup
      :visible-popup="isShowConfirmationPopup"
      :dispute-info="selectedDispute"
      @save="changeDisputeStatus"
      @close="isShowConfirmationPopup = false"
    />
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
import DisputeStatusDescriptionCell from '@/components/tableCells/DisputeStatusDescriptionCell';
import ConfirmResubmitDisputePopup from '@/components/ConfirmDisputePopup/ConfirmResubmitDisputePopup';
import ConfirmDisputePopup from '@/components/ConfirmDisputePopup/ConfirmDisputePopup';

import { ENTITY_TYPES } from '@/constants';
import TableToolbar from '@/components/TableToolbar';

export default {
  name: 'DisputesPage',
  components: {
    TableToolbar,
    DisputesTableToolbar,
    XYZStatusCell,
    ConfirmResubmitDisputePopup,
    ConfirmDisputePopup,
    DisputeStatusDescriptionCell,
  },
  mixins: [disputeCommonTable],
  data() {
    return {
      tableName: ENTITY_TYPES.DISPUTES,
      rowComponentsHash: {
        xyzStatus: 'XYZStatusCell',
        disputeStatusDescription: 'DisputeStatusDescriptionCell',
      },
      isShowResubmitConfirmationPopup: false,
      isShowConfirmationPopup: false,
    };
  },
  methods: {
    async changeDisputeStatus({ disputeId, statusId, comments }) {
      this.isShowResubmitConfirmationPopup = false;
      this.isShowConfirmationPopup = false;
      await this.onChangeDisputeStatus({ disputeId, statusId, comments });
    },
    onConfirmResubmitDisputeStatus({ disputeId, statusId }) {
      this.selectedDispute = { disputeId, statusId };
      this.isShowResubmitConfirmationPopup = true;
    },
    onConfirmDisputeStatus({ disputeId, statusId }) {
      this.selectedDispute = { disputeId, statusId };
      this.isShowConfirmationPopup = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
.disputes-table {
  @include table-base-container;
}
.disputes-table /deep/ {
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

.selected-date-range {
  @include selected-date-range;
}
</style>
