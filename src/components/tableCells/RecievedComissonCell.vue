<template>
  <div class="recieved-comisson-cell">
    <span
      :class="{
        'shortage-comisson': isShortageComission,
        'paid-comisson': isCommissionPaid,
        'overpaid-comisson': isCommissionOverpaid,
      }"
      >{{ recevedComission | currency }}</span
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
    expectedComission() {
      return this.item.expectedComission ? parseFloat(this.item.expectedComission) : 0;
    },
    recevedComission() {
      return this.item.recevedComission ? parseFloat(this.item.recevedComission) : 0;
    },
    isShortageComission() {
      return this.expectedComission > this.recevedComission;
    },
    isCommissionPaid() {
      return this.expectedComission === this.recevedComission;
    },
    isCommissionOverpaid() {
      return this.recevedComission > this.expectedComission;
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
