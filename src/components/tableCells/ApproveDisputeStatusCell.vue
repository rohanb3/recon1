<template>
  <div class="resubmit-claim-cell">
    <table-button
      v-if="isInprogressStatus"
      class="disput-button button-blue"
      :title="$t('approve')"
      :disabled="isStatusNotEditableOrStatusProcessing"
      :preloader="statusProcessing"
      @click="onResubmit"
    />
    <span
      v-if="isApprovedStatus || isConfirmApprovedStatus"
      :title="statusChangedOn | dateDefaultFormat"
      >{{ statusChangedOn | dateYearMonthDay }}</span
    >
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';
import disputeStatusAutocomplete from '@/mixins/disputeStatusAutocomplete';
import { DISPUTE_STATUSES_ID } from '@/constants';

export default {
  name: 'ApproveDisputeStatusCell',
  mixins: [disputeStatusAutocomplete],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    TableButton,
  },
  methods: {
    onResubmit() {
      this.$emit('confirmApproveDisputeStatus', {
        id: this.item.id,
        statusId: DISPUTE_STATUSES_ID.CONFIRM_APPROVED,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.resubmit-claim-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .disput-button {
    line-height: 0;

    &.button-blue:not(.disabled-button) {
      color: $base-white;
      background: $base-blue;
    }
  }
}
</style>
