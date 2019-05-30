<template>
  <div class="recieved-comisson-cell">
    <span
      :class="{
        'shortage-comisson': isShortageComission,
        'paid-comisson': isCommissionPaid,
        'overpaid-comisson': isCommissionOverpaid,
      }"
      >{{ receivedCommission | currency }}</span
    >
  </div>
</template>

<script>
import currency from '@/filters/currency';

export default {
  name: 'RecievedComissonCell',
  props: {
    item: {
      type: Object,
    },
  },
  filters: {
    currency,
  },
  computed: {
    expectedCommission() {
      return this.item.expectedCommission ? parseFloat(this.item.expectedCommission) : 0;
    },
    receivedCommission() {
      return this.item.receivedCommission ? parseFloat(this.item.receivedCommission) : 0;
    },
    isShortageComission() {
      return this.expectedCommission > this.receivedCommission;
    },
    isCommissionPaid() {
      return this.expectedCommission === this.receivedCommission;
    },
    isCommissionOverpaid() {
      return this.receivedCommission > this.expectedCommission;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.shortage-comisson {
  color: $base-red;
  opacity: 0.6;
}

.paid-comisson {
  color: $base-green-text;
}

.overpaid-comisson {
  color: $base-blue;
}
</style>
