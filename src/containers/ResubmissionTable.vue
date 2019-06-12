<template>
  <div class="resubmission-table">
    <div class="resubmission-table__header">
      <div class="table-toolbar">
        <div class="table-title">{{ $t('resubmission.table.title') }}</div>
        <resubmission-table-toolbar :tableName="tableName" @exportToCsvFile="onExportToCsvFile" />
      </div>
      <div class="selected-date-range" v-show="isSelectedDateRange">
        {{ $t('selected.date.range') }}{{ selectedDateRange | dateRange({ prefix: ': ' }) }}
      </div>
    </div>
    <lazy-load-table :tableName="tableName">
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
        :filter="rowCell.column.filter"
        @changeDisputeStatus="changeDisputeStatus"
        @confirmApproveDisputeStatus="onConfirmApproveDisputeStatus"
        @confirmRejectDisputeStatus="onConfirmRejectDisputeStatus"
        @selectId="onSelectIdDispute"
      />
    </lazy-load-table>
    <confirm-approve-dispute-popup
      :visible-popup="isShowApproveConfirmationPopup"
      :dispute-info="selectedDispute"
      @save="changeDisputeStatus"
      @close="isShowApproveConfirmationPopup = false"
    />
    <confirm-reject-dispute-popup
      :visible-popup="isShowRejectConfirmationPopup"
      :dispute-info="selectedDispute"
      @save="changeDisputeStatus"
      @close="isShowRejectConfirmationPopup = false"
    />
    <dispute-history
      v-if="disputeHistoryShown"
      :parent-table-name="tableName"
      @close="disputeHistoryShown = false"
    />
  </div>
</template>

<script>
import ResubmissionTableToolbar from '@/containers/ResubmissionTableToolbar';

import ConfirmApproveDisputePopup from '@/components/ConfirmDisputePopup/ConfirmApproveDisputePopup';
import ConfirmRejectDisputePopup from '@/components/ConfirmDisputePopup/ConfirmRejectDisputePopup';

import disputeCommonTable from '@/mixins/disputeCommonTable';

import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'ResubmissionTable',
  components: {
    ConfirmApproveDisputePopup,
    ConfirmRejectDisputePopup,
    ResubmissionTableToolbar,
  },
  mixins: [disputeCommonTable],
  data() {
    return {
      tableName: ENTITY_TYPES.RESUBMISSION,
      isShowApproveConfirmationPopup: false,
      isShowRejectConfirmationPopup: false,
      rowComponentsHash: {
        resubmitClaim: 'ResubmitClaimCell',
        rejectDisputeStatus: 'RejectDisputeStatusCell',
        approveDisputeStatus: 'ApproveDisputeStatusCell',
      },
    };
  },
  methods: {
    async changeDisputeStatus({ disputeId, statusId, comments }) {
      this.isShowApproveConfirmationPopup = false;
      this.isShowRejectConfirmationPopup = false;
      await this.onChangeDisputeStatus({ disputeId, statusId, comments });
    },
    onConfirmApproveDisputeStatus({ disputeId, statusId }) {
      this.selectedDispute = { disputeId, statusId };
      this.isShowApproveConfirmationPopup = true;
    },
    onConfirmRejectDisputeStatus({ disputeId, statusId }) {
      this.selectedDispute = { disputeId, statusId };
      this.isShowRejectConfirmationPopup = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
.resubmission-table {
  @include table-base-container;
}
.table-toolbar {
  @include table-base-toolbar;
}
.table-title {
  @include table-base-title;
}

.resubmission-table__header {
  @include table__header;
}

.resubmission-table /deep/ {
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
