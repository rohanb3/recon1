<template>
  <div>{{ syncOrderStatus }}</div>
</template>

<script>
import { TABLE_NAMES, ORDER_SYNC_STATUS } from '@/constants';
import { successMessage, errorMessage } from '@/services/notifications';

export default {
  name: 'SyncNotifier',
  computed: {
    syncOrderStatus() {
      return this.$store.state.storage[TABLE_NAMES.CLAIMS_ORDERS].syncOrdersStatus;
    },
  },
  watch: {
    syncOrderStatus(newStatus, oldStatus) {
      if (oldStatus === ORDER_SYNC_STATUS.WORKING) {
        if (newStatus === ORDER_SYNC_STATUS.FINISHED) {
          successMessage('sync.orders.completed');
        }
        if (newStatus === ORDER_SYNC_STATUS.ERROR) {
          errorMessage('something.went.wrong', 'no.sync.occurred');
        }
      }
    },
  },
};
</script>
