<template>
  <div class="dispute-status-cell">{{ $t(status) }}</div>
</template>

<script>
import { DISPUTE_STATUSES_ID } from '@/constants';

const statusesMap = {
        [DISPUTE_STATUSES_ID.CONFIRM_APPROVED]: 'approved',
        [DISPUTE_STATUSES_ID.RE_SENT]: 'rejected',
        [DISPUTE_STATUSES_ID.CONFIRM_REJECTED]: 'rejected',
        [DISPUTE_STATUSES_ID.SENT]: 'new'
      }

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
    status() {
      return statusesMap[this.disputeStatus.id] || this.disputeStatus.disputeStatusName;
    },
  },
};
</script>
