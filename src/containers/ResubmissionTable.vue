<template>
  <div class="disputes-table">
    <div class="table-toolbar">
      <div class="table-title">{{ $t('resubmission.table.title') }}</div>
      <resubmission-table-toolbar :tableName="tableName" @exportToCsvFile="onExportToCsvFile" />
    </div>
    <div class="selected-date-range" v-show="isSelectedDateRange">
      {{ $t('selected.date.range') }}{{ selectedDateRange | dateRange({ prefix: ': ' }) }}
    </div>
    <wombat-table
      :items="rows"
      :columns="columns"
      :item-height="50"
      :infinite-loading="!allItemsLoaded"
      :loading-items="loading"
      @bottomReached="checkAndLoadItems"
      @columnsResized="onColumnsResized"
      @columnsReordered="onColumnsReordered"
    >
      <component
        slot="header-cell"
        slot-scope="headerCell"
        class="header-cell"
        :is="
          headerComponentsHash[headerCell.column.fieldHeaderType] || headerComponentsHash.default
        "
        :column="headerCell.column"
        :sortingField="sortingField"
        :sortDirection="sortDirection"
        @sortDirectionChanged="onSortDirectionChanged"
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
            @changeDisputeStatus="changeDisputeStatus"
            @confirmApproveDisputeStatus="onConfirmApproveDisputeStatus"
            @confirmRejectDisputeStatus="onConfirmRejectDisputeStatus"
            @selectId="onSelectIdDispute"
          />
        </wombat-row>
      </div>
      <table-loader v-if="loading" slot="loader" />
    </wombat-table>
    <v-progress-circular
      v-if="applyingFilters"
      class="big-spinner"
      :size="70"
      :width="7"
      color="blue"
      indeterminate
    ></v-progress-circular>
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

import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';
import disputeCommonTable from '@/mixins/disputeCommonTable';

import { ENTITY_TYPES } from '@/constants';

export default {
  name: 'ResubmissionTable',
  components: {
    ConfirmApproveDisputePopup,
    ConfirmRejectDisputePopup,
    ResubmissionTableToolbar,
  },
  mixins: [configurableColumnsTable, lazyLoadTable, disputeCommonTable],
  data() {
    return {
      tableName: ENTITY_TYPES.RESUBMISSION,
      isShowApproveConfirmationPopup: false,
      isShowRejectConfirmationPopup: false,
      selectedDispute: {},
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
.disputes-table {
  @include table-base-container;
}
.table-toolbar {
  @include table-base-toolbar;
}
.table-title {
  @include table-base-title;
}
.disputes-table /deep/ {
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

.selected-date-range {
  @include selected-date-range;
}
</style>
