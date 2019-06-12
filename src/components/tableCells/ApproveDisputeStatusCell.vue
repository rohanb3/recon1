<template>
  <div class="resubmit-claim-cell">
    <table-button
      v-if="isInprogressStatus"
      class="disput-button button-blue"
      :title="$t('approve')"
      :disabled="isDenyApprove"
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
import { DISPUTE_STATUSES_ID, SCOPES } from '@/constants';

export default {
  name: 'ApproveDisputeStatusCell',
  mixins: [disputeStatusAutocomplete],
  props: {
    item: {
      type: Object,
      required: true,
    },
    scopes: {
      type: Array,
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
    isDenyApprove() {
      return !this.scopes.includes(SCOPES.DISPUTE_PATCH);
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

    &.button-blue:not(.disabled-button) {
      color: $base-white;
      background: $base-blue;
    }
  }
}
</style>
