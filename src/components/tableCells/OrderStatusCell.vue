<template>
  <div class="order-status-cell" :class="{ 'order-not-installed': isOrderNotInstalled }">
    {{ orderStatus }}
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';

import { ORDER_STATUSES_NAME } from '@/constants';

export default {
  name: 'OrderStatusCell',
  mixins: [nestedFieldCell],
  computed: {
    orderStatus() {
      const statusList = {
        [ORDER_STATUSES_NAME.NOT_INSTALLED]: this.$t('orders.order.status.not.installed'),
        [ORDER_STATUSES_NAME.INSTALLED]: this.$t('orders.order.status.installed'),
        [ORDER_STATUSES_NAME.CANCELED]: this.$t('orders.order.status.canceled'),
        [ORDER_STATUSES_NAME.CLAIM_SUBMITTED]: this.$t('orders.order.status.claim.submitted'),
        [ORDER_STATUSES_NAME.ONLINE_ORDER]: this.$t('orders.order.status.online.order'),
        [ORDER_STATUSES_NAME.PENDING]: this.$t('orders.order.status.pending'),
        [ORDER_STATUSES_NAME.CALL_IN_ORDER]: this.$t('orders.order.status.call.in.order'),
      };

      return statusList[this.value] || statusList[ORDER_STATUSES_NAME.NOT_INSTALLED];
    },
    isOrderNotInstalled() {
      return this.value === ORDER_STATUSES_NAME.NOT_INSTALLED || this.value === null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.order-not-installed {
  opacity: 0.6;
  color: $base-text-color;
}
</style>
