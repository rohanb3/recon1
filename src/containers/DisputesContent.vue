<template>
  <div class="disputes-table" :class="`${this.getTableName}-table`">
    <slot name="toolbar" />
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
        @confirmDisputeStatus="onConfirmDisputeStatus"
        @confirmResubmitDisputeStatus="onConfirmResubmitDisputeStatus"
        @selectId="onSelectId"
      />
    </lazy-load-table>
    <confirm-resubmit-dispute-popup
      :visible-popup="isShowResubmitConfirmationPopup"
      :dispute-info="selected"
      @save="changeDisputeStatus"
      @close="isShowResubmitConfirmationPopup = false"
    />
    <confirm-dispute-popup
      :visible-popup="isShowConfirmationPopup"
      :dispute-info="selected"
      @save="changeDisputeStatus"
      @close="isShowConfirmationPopup = false"
    />
    <dispute-history
      v-if="historyShown"
      :parent-table-name="tableName"
      @close="historyShown = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ConfirmResubmitDisputePopup from '@/components/ConfirmDisputePopup/ConfirmResubmitDisputePopup';
import XYZStatusCell from '@/components/tableCells/XYZStatusCell';
import DisputeStatusDescriptionCell from '@/components/tableCells/DisputeStatusDescriptionCell';
import ConfirmDisputePopup from '@/components/ConfirmDisputePopup/ConfirmDisputePopup';
import disputeCommonTable from '@/mixins/disputeCommonTable';

export default {
  name: 'DisputesContent',
  props: {
    tableName: {
      type: String,
      required: true,
    },
  },
  components: {
    ConfirmResubmitDisputePopup,
    ConfirmDisputePopup,
    XYZStatusCell,
    DisputeStatusDescriptionCell,
  },
  data() {
    return {
      rowComponentsHash: {
        xyzStatus: 'XYZStatusCell',
        disputeStatusDescription: 'DisputeStatusDescriptionCell',
      },
      isShowResubmitConfirmationPopup: false,
      isShowConfirmationPopup: false,
    };
  },
  mixins: [disputeCommonTable],
  methods: {
    async changeDisputeStatus(data) {
      this.isShowResubmitConfirmationPopup = false;
      this.isShowConfirmationPopup = false;
      await this.onChangeStatus(data);
    },
    onConfirmResubmitDisputeStatus(data) {
      this.selected = data;
      this.isShowResubmitConfirmationPopup = true;
    },
    onConfirmDisputeStatus(data) {
      this.selected = data;
      this.isShowConfirmationPopup = true;
    },
  },
  mounted() {
    console.log('test');
  },
  computed: {
    ...mapGetters(['isShowDispute', 'isPatchDispute', 'scopes']),
    getTableName() {
      return this.tableName.toLowerCase();
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
      100vh - #{$header-height} - 2 * #{$table-list-padding} - #{$table-toolbar-height} -
        #{$table-header-height} - #{$table-header-height-offset}
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
