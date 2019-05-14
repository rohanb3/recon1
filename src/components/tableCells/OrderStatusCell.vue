<template>
  <div class="order-status-cell" :class="{ 'order-not-installed': isOrderNotInstalled }">
    {{ orderStatus }}
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';

import { ORDER_STATUSES_NAME, ORDER_STATUS_NAME_TRANSLATION_KEYS } from '@/constants';

export default {
  name: 'OrderStatusCell',
  mixins: [nestedFieldCell],
  computed: {
    orderStatus() {
      const translationKey = ORDER_STATUS_NAME_TRANSLATION_KEYS[this.value];
      return translationKey
        ? this.$t(translationKey)
        : this.$t(ORDER_STATUS_NAME_TRANSLATION_KEYS[ORDER_STATUSES_NAME.NOT_INSTALLED]);
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
