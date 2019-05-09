<template>
  <div class="dispute-button-cell">
    <template v-if="!isSentOrInProgressStatus">
      <template v-if="isConfirmApprovedOrRejectedStatus">
        <table-button class="disput-button button-blue" :title="$t('confirm')" @click="onConfirm" />
        <table-button class="disput-button" :title="$t('resubmit')" @click="onResubmit" />
      </template>
      <span v-show="isApprovedStatus" class="confirmed-status">{{ $t('confirmed') }}</span>
      <span v-show="isResentStatus" class="resubmited-status">{{ $t('resubmited') }}</span>
    </template>
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';
import disputeStatusAutocomplete from '@/mixins/disputeStatusAutocomplete';
import { DISPUTE_STATUSES_ID } from '@/constants';

export default {
  name: 'XYZStatusCell',
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
    disputeStatusId() {
      return (this.item.disputeStatus || {}).id;
    },
    isSentOrInProgressStatus() {
      return this.isSentStatus || this.isInProgressStatus;
    },
    isApprovedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.APPROVED;
    },
    isConfirmApprovedOrRejectedStatus() {
      return this.isConfirmApprovedStatus || this.isConfirmRejectedStatus;
    },
  },
  methods: {
    onResubmit() {
      this.$emit('changeDisputeStatus', {
        disputeId: this.item.id,
        statusId: DISPUTE_STATUSES_ID.RE_SENT,
      });
    },
    onConfirm() {
      this.$emit('changeDisputeStatus', {
        disputeId: this.item.id,
        statusId: DISPUTE_STATUSES_ID.APPROVED,
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

  .approved-dispute {
    color: $base-red;
    font-weight: 500;
  }

  .disput-button {
    line-height: 0;
    &.button-blue {
      color: $base-white;
      background: $base-blue;
    }
  }
}
</style>
