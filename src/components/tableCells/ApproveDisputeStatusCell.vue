<template>
  <div class="resubmit-claim-cell">
    <table-button
      v-if="isInprogressStatus"
      class="disput-button button-blue"
      :title="$t('approve')"
      @click="onResubmit"
    />
    <span
      v-if="!isInprogressStatus && isContainsApprovedStatus"
      :title="approveDate | dateDefaultFormat"
      >{{ approveDate | dateYearMonthDay }}</span
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
  computed: {
    approveDate() {
      return this.getLastDisputeStatus(DISPUTE_STATUSES_ID.CONFIRM_APPROVED).timeStamp || '';
    },
    isContainsApprovedStatus() {
      return this.isContainsStatusInHistory(DISPUTE_STATUSES_ID.CONFIRM_APPROVED);
    },
  },
  methods: {
    onResubmit() {
      this.$emit('confirmApproveDisputeStatus', {
        disputeId: this.item.id,
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

    &.button-blue {
      color: $base-white;
      background: $base-blue;
    }
  }
}
</style>
