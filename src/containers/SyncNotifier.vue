<template>
  <div>{{ syncOrderStatus }}</div>
</template>

<script>
import { ENTITY_TYPES, ORDER_SYNC_STATUS } from '@/constants';
import { successMessage, errorMessage } from '@/services/notifications';

export default {
  name: 'SyncNotifier',
  computed: {
    syncOrderStatus() {
      return this.$store.state.storage[ENTITY_TYPES.ORDERS].syncOrdersStatus;
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
