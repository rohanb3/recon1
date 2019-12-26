<template>
  <div class="claims_resubmission-table">
    <table-toolbar :title="$t('resubmission.table.title')" :table-name="tableName">
      <claims-resubmission-table-toolbar :tableName="tableName" slot="filters" />
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
      title="claim.id"
      :table-name="historyTableName"
      v-if="historyShown"
      :parent-table-name="tableName"
      @close="historyShown = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ClaimsResubmissionTableToolbar from '@/containers/ClaimsResubmissionTableToolbar';

import ConfirmApproveDisputePopup from '@/components/ConfirmDisputePopup/ConfirmApproveDisputePopup';
import ConfirmRejectDisputePopup from '@/components/ConfirmDisputePopup/ConfirmRejectDisputePopup';

import claimCommonTable from '@/mixins/claimCommonTable';

import { TABLE_NAMES } from '@/constants';
import TableToolbar from '@/components/TableToolbar';

export default {
  name: 'ResubmissionTable',
  components: {
    TableToolbar,
    ConfirmApproveDisputePopup,
    ConfirmRejectDisputePopup,
    ClaimsResubmissionTableToolbar,
  },
  mixins: [claimCommonTable],
  data() {
    return {
      tableName: TABLE_NAMES.CLAIMS_RESUBMISSION,
      isShowApproveConfirmationPopup: false,
      isShowRejectConfirmationPopup: false,
      rowComponentsHash: {
        resubmitClaim: 'ResubmitCell',
        rejectDisputeStatus: 'RejectDisputeStatusCell',
        approveDisputeStatus: 'ApproveDisputeStatusCell',
      },
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
.claims_resubmission-table {
  @include table-base-container;
}
.table-toolbar {
  @include table-base-toolbar;
}
.table-title {
  @include table-base-title;
}

.claims_resubmission-table__header {
  @include table__header;
}

.claims_resubmission-table /deep/ {
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
