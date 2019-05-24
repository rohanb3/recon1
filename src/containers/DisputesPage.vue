<template>
  <div class="disputes-table">
    <div class="table-toolbar">
      <div class="table-title">{{ $t('disputes.title') }}</div>
      <disputes-table-toolbar :tableName="tableName" @exportToCsvFile="onExportToCsvFile" />
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
            @changeDisputeStatus="onChangeDisputeStatus"
            @confirmApproveDisputeStatus="onConfirmApproveDisputeStatus"
            @confirmRejectDisputeStatus="onConfirmRejectDisputeStatus"
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
      @save="onChangeDisputeStatus"
      @close="isShowApproveConfirmationPopup = false"
    />
    <confirm-reject-dispute-popup
      :visible-popup="isShowRejectConfirmationPopup"
      :dispute-info="selectedDispute"
      @save="onChangeDisputeStatus"
      @close="isShowRejectConfirmationPopup = false"
    />
  </div>
</template>

<script>
import WombatTable from '@/components/WombatTable/Table';
import WombatRow from '@/components/WombatTable/Row';
import TableLoader from '@/components/TableLoader';

import DefaultHeaderCell from '@/components/tableHeaderCells/DefaultHeaderCell';
import SortingHeaderCell from '@/components/tableHeaderCells/SortingHeaderCell';

import DefaultCell from '@/components/tableCells/DefaultCell';
import DateMonthYearCell from '@/components/tableCells/DateMonthYearCell';
import RecievedComissonCell from '@/components/tableCells/RecievedComissonCell';
import DifferenceComissonCell from '@/components/tableCells/DifferenceComissonCell';
import DateYearMonthDayCell from '@/components/tableCells/DateYearMonthDayCell';
import XYZStatusCell from '@/components/tableCells/XYZStatusCell';
import OrderAgeCell from '@/components/tableCells/OrderAgeCell';
import PriceCell from '@/components/tableCells/PriceCell';
import ResubmitClaimCell from '@/components/tableCells/ResubmitClaimCell';
import RejectDisputeStatusCell from '@/components/tableCells/RejectDisputeStatusCell';
import ApproveDisputeStatusCell from '@/components/tableCells/ApproveDisputeStatusCell';
import DisputeStatusCell from '@/components/tableCells/DisputeStatusCell';

import ConfirmApproveDisputePopup from '@/components/ConfirmDisputePopup/ConfirmApproveDisputePopup';
import ConfirmRejectDisputePopup from '@/components/ConfirmDisputePopup/ConfirmRejectDisputePopup';

import DisputesTableToolbar from '@/containers/DisputesTableToolbar';

import configurableColumnsTable from '@/mixins/configurableColumnsTable';
import lazyLoadTable from '@/mixins/lazyLoadTable';

import { ENTITY_TYPES } from '@/constants';

import { changeStatusDispute, getDispute, getDisputesCsvFile } from '@/services/disputesRepository';
import { errorMessage } from '@/services/notifications';
import { CHANGE_ITEM } from '@/store/storage/mutationTypes';
import { generateCSVFile } from '@/services/utils';

import { mapState } from 'vuex';

export default {
  name: 'DisputesPage',
  components: {
    WombatTable,
    WombatRow,
    TableLoader,
    DefaultCell,
    DateMonthYearCell,
    RecievedComissonCell,
    DifferenceComissonCell,
    DateYearMonthDayCell,
    OrderAgeCell,
    XYZStatusCell,
    PriceCell,
    DefaultHeaderCell,
    SortingHeaderCell,
    ResubmitClaimCell,
    RejectDisputeStatusCell,
    ApproveDisputeStatusCell,
    DisputesTableToolbar,
    ConfirmApproveDisputePopup,
    ConfirmRejectDisputePopup,
    DisputeStatusCell,
  },
  mixins: [configurableColumnsTable, lazyLoadTable],
  data() {
    return {
      tableName: ENTITY_TYPES.DISPUTES,
      isShowApproveConfirmationPopup: false,
      isShowRejectConfirmationPopup: false,
      disputeStatusId: false,
      selectedDispute: {},
      headerComponentsHash: {
        default: 'DefaultHeaderCell',
        sortingHeader: 'SortingHeaderCell',
      },
      rowComponentsHash: {
        default: 'DefaultCell',
        dateMonthYear: 'DateMonthYearCell',
        price: 'PriceCell',
        recievedComisson: 'RecievedComissonCell',
        differenceComisson: 'DifferenceComissonCell',
        dateYearMonthDay: 'DateYearMonthDayCell',
        ageAfterOrder: 'OrderAgeCell',
        ageAfterInstallation: 'OrderAgeCell',
        ageAfterDispute: 'OrderAgeCell',
        xyzStatus: 'XYZStatusCell',
        resubmitClaim: 'ResubmitClaimCell',
        rejectDisputeStatus: 'RejectDisputeStatusCell',
        approveDisputeStatus: 'ApproveDisputeStatusCell',
        disputeStatus: 'DisputeStatusCell',
      },
    };
  },
  computed: {
    ...mapState({
      profileData: state => state.loggedInUser.profileData || {},
    }),
    displayName() {
      return this.profileData.displayName || '';
    },
  },
  methods: {
    async onChangeDisputeStatus({ disputeId, statusId, comments }) {
      this.isShowApproveConfirmationPopup = false;
      this.isShowRejectConfirmationPopup = false;
      const userName = this.displayName;
      const status = statusId;

      try {
        await changeStatusDispute({ disputeId, status, userName, comments });
        const disputeInfo = await getDispute(disputeId);
        this.$store.commit(CHANGE_ITEM, {
          itemType: this.tableName,
          id: disputeId,
          ...disputeInfo,
        });
      } catch {
        errorMessage();
      }
    },
    onConfirmApproveDisputeStatus({ disputeId, statusId }) {
      this.selectedDispute = { disputeId, statusId };
      this.isShowApproveConfirmationPopup = true;
    },
    onConfirmRejectDisputeStatus({ disputeId, statusId }) {
      this.selectedDispute = { disputeId, statusId };
      this.isShowRejectConfirmationPopup = true;
    },
    async onExportToCsvFile() {
      const CSVFile = await getDisputesCsvFile(this.filters);
      generateCSVFile(CSVFile, this.tableName);
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
