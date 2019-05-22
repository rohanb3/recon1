<template>
  <div class="dispute-status-cell">{{ status }}</div>
</template>

<script>
import { DISPUTE_STATUSES_ID } from '@/constants';

export default {
  name: 'DisputeStatusCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    disputeStatus() {
      return this.item.disputeStatus || {};
    },
    disputeStatusId() {
      return this.disputeStatus.id;
    },
    disputeStatusName() {
      return this.disputeStatus.disputeStatusName;
    },
    status() {
      if (this.disputeStatusId === DISPUTE_STATUSES_ID.CONFIRM_APPROVED) {
        return this.$t('approved');
      }
      if (this.disputeStatusId === DISPUTE_STATUSES_ID.CONFIRM_REJECTED) {
        return this.$t('rejected');
      }
      return this.disputeStatusName;
    },
  },
};
</script>
