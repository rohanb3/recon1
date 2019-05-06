<template>
  <div class="order-status-cell" :class="{ 'order-not-installed': isOrderNotInstalled }">
    {{ orderStatus }}
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';

import {
  ORDER_STATUS_NAME_NOT_INSTALLED,
  ORDER_STATUS_NAME_INSTALLED,
  ORDER_STATUS_NAME_CANCELED,
} from '@/constants/orderStatus';

export default {
  name: 'OrderStatusCell',
  mixins: [nestedFieldCell],
  computed: {
    orderStatus() {
      const statusList = {
        [ORDER_STATUS_NAME_NOT_INSTALLED]: this.$t('orders.order.status.not.installed'),
        [ORDER_STATUS_NAME_INSTALLED]: this.$t('orders.order.status.installed'),
        [ORDER_STATUS_NAME_CANCELED]: this.$t('orders.order.status.canceled'),
      };

      return statusList[this.value] || statusList[ORDER_STATUS_NAME_NOT_INSTALLED];
    },
    isOrderNotInstalled() {
      return this.value === ORDER_STATUS_NAME_NOT_INSTALLED || this.value === null;
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
