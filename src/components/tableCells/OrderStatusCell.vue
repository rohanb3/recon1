<template>
  <div class="order-status-cell" :class="{ 'order-not-installed': isOrderNotInstalled }">
    {{ orderStatus }}
  </div>
</template>

<script>
const ORDER_NOT_INSTALLED = 0;

export default {
  name: 'OrderStatusCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    orderStatus() {
      const statusList = [
        this.$t('orders.order.status.not.installed'),
        this.$t('orders.order.status.installed'),
        this.$t('orders.order.status.canceled'),
      ];

      return statusList[this.value] || statusList[ORDER_NOT_INSTALLED];
    },
    isOrderNotInstalled() {
      return this.value === ORDER_NOT_INSTALLED || this.value === null;
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
