<template>
  <div class="disputes_resubmission-table">
    <table-toolbar :title="$t('resubmission.table.title')" :table-name="tableName">
      <disputes-resubmission-table-toolbar :tableName="tableName" slot="filters" />
    </table-toolbar>
    <lazy-load-table :tableName="tableName">
      <component
        slot="row-cell"
        slot-scope="rowCell"
        class="row-cell"
        v-model="orderIdCommission"
        :is="rowComponentsHash[rowCell.column.fieldType] || rowComponentsHash.default"
        :item="rowCell.item"
        :column="rowCell.column"
        :filter="rowCell.column.filter"
        :scopes="scopes"
        :processing-ids="processingIds"
        @changeDisputeStatus="changeDisputeStatus"
        @confirmApproveDisputeStatus="onConfirmApproveDisputeStatus"
        @confirmRejectDisputeStatus="onConfirmRejectDisputeStatus"
        @selectId="onSelectId"
      />
    </lazy-load-table>
    <confirm-approve-dispute-popup
      :visible-popup="isShowApproveConfirmationPopup"
      :dispute-info="selected"
      @save="changeDisputeStatus"
      @close="isShowApproveConfirmationPopup = false"
    />
    <confirm-reject-dispute-popup
      :visible-popup="isShowRejectConfirmationPopup"
      :dispute-info="selected"
      @save="changeDisputeStatus"
      @close="isShowRejectConfirmationPopup = false"
    />
    <history
      title="dispute.id"
      :table-name="historyTableName"
      v-if="historyShown"
      :parent-table-name="tableName"
      @close="historyShown = false"
    />
    <commission-popup v-model="orderIdCommission" v-if="orderIdCommission" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import DisputesResubmissionTableToolbar from '@/containers/DisputesResubmissionTableToolbar';

import ConfirmApproveDisputePopup from '@/components/ConfirmDisputePopup/ConfirmApproveDisputePopup';
import ConfirmRejectDisputePopup from '@/components/ConfirmDisputePopup/ConfirmRejectDisputePopup';

import disputeCommonTable from '@/mixins/disputeCommonTable';

import { TABLE_NAMES } from '@/constants';
import TableToolbar from '@/components/TableToolbar';

import CommissionCell from '@/components/tableCells/CommissionCell';
import CommissionPopup from '../components/CommissionPopup';
import DifferenceCell from '../components/tableCells/DifferenceCell';

export default {
  name: 'ResubmissionTable',
  components: {
    CommissionPopup,
    TableToolbar,
    ConfirmApproveDisputePopup,
    ConfirmRejectDisputePopup,
    DisputesResubmissionTableToolbar,
    CommissionCell,
    DifferenceCell,
  },
  mixins: [disputeCommonTable],
  data() {
    return {
      tableName: TABLE_NAMES.DISPUTES_RESUBMISSION,
      isShowApproveConfirmationPopup: false,
      isShowRejectConfirmationPopup: false,
      rowComponentsHash: {
        resubmitDispute: 'ResubmitCell',
        rejectDisputeStatus: 'RejectDisputeStatusCell',
        approveDisputeStatus: 'ApproveDisputeStatusCell',
        receivedCommissionCell: 'CommissionCell',
        differenceCell: 'DifferenceCell',
      },
      orderIdCommission: null,
    };
  },
  methods: {
    async changeDisputeStatus(data) {
      this.isShowApproveConfirmationPopup = false;
      this.isShowRejectConfirmationPopup = false;
      await this.onChangeStatus(data);
    },
    onConfirmApproveDisputeStatus(data) {
      this.selected = data;
      this.isShowApproveConfirmationPopup = true;
    },
    onConfirmRejectDisputeStatus(data) {
      this.selected = data;
      this.isShowRejectConfirmationPopup = true;
    },
  },
  computed: {
    ...mapGetters(['scopes']),
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
.disputes_resubmission-table {
  @include table-base-container;
}
.table-toolbar {
  @include table-base-toolbar;
}
.table-title {
  @include table-base-title;
}

.disputes_resubmission-table__header {
  @include table__header;
}

.disputes_resubmission-table /deep/ {
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

.selected-date-range {
  @include selected-date-range;
}
</style>
