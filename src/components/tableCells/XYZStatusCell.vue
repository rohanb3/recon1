<template>
  <div class="dispute-button-cell">
    <template v-if="isRejectedStatus">
      <table-button
        class="disput-button button-blue"
        :title="$t('confirm')"
        :disabled="isDenyChangeXYZStatusOrStatusProcessing"
        :preloader="statusProcessing"
        @click="onConfirm"
      />
      <table-button
        class="disput-button"
        :title="$t('resubmit')"
        :disabled="isDenyChangeXYZStatusOrStatusProcessing"
        :preloader="statusProcessing"
        @click="onResubmit"
      />
    </template>
    <span v-show="isConfirmRejectedOrConfirmApprovedStatus" class="confirmed-status">{{
      $t('confirmed')
    }}</span>
    <span v-show="isResentStatus" class="resubmited-status">{{ $t('resubmited') }}</span>
    <span v-show="isSentOrInProgressStatus">{{ $t('pending') }}</span>
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';
import disputeStatusAutocomplete from '@/mixins/disputeStatusAutocomplete';
import { DISPUTE_STATUSES_ID, SCOPES } from '@/constants';

export default {
  name: 'XYZStatusCell',
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
    disputeStatusId() {
      return (this.item.disputeStatus || {}).id;
    },
    isSentOrInProgressStatus() {
      return this.isSentStatus || this.isInprogressStatus;
    },
    isApprovedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.APPROVED;
    },
    isRejectedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.REJECTED;
    },
    statusIdForConfirmDispute() {
      if (this.isApprovedStatus) {
        return DISPUTE_STATUSES_ID.CONFIRM_APPROVED;
      }
      return DISPUTE_STATUSES_ID.CONFIRM_REJECTED;
    },
    isConfirmRejectedOrConfirmApprovedStatus() {
      return this.isConfirmApprovedStatus || this.isConfirmRejectedStatus || this.isApprovedStatus;
    },
    isDenyChangeXYZStatus() {
      return !this.scopes.includes(SCOPES.DISPUTE_PATCH);
    },
    isDenyChangeXYZStatusOrStatusProcessing() {
      return this.isDenyChangeXYZStatus || this.statusProcessing;
    },
  },
  methods: {
    onResubmit() {
      this.$emit('confirmResubmitDisputeStatus', {
        disputeId: this.item.id,
        statusId: DISPUTE_STATUSES_ID.RE_SENT,
      });
    },
    onConfirm() {
      this.$emit('confirmDisputeStatus', {
        disputeId: this.item.id,
        statusId: this.statusIdForConfirmDispute,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.dispute-button-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .confirmed-status {
    color: $base-green-text;
  }

  .resubmited-status {
    color: $base-orange;
  }

  .approved-dispute,
  .rejected-status {
    color: $base-red;
    font-weight: 500;
  }

  .disput-button {
    line-height: 0;
    &.button-blue:not(.disabled-button) {
      color: $base-white;
      background: $base-blue;
    }
  }
}
</style>
