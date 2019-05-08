<template>
  <div class="recieved-comisson-cell">
    <span
      v-if="!isUnknowComission"
      :class="{
        'shortage-comisson': isShortageComission,
        'paid-comisson': isCommissionPaid,
        'overpaid-comisson': isCommissionOverpaid,
      }"
      >{{ recevedСomission | currency }}</span
    >
    <span v-else>-</span>
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
    isUnknowComission() {
      return this.item.expectedComission === null || this.item.recevedСomission === null;
    },
    expectedComission() {
      return this.item.expectedComission ? parseFloat(this.item.expectedComission) : 0;
    },
    recevedСomission() {
      return this.item.recevedСomission ? parseFloat(this.item.recevedСomission) : 0;
    },
    isShortageComission() {
      return this.expectedComission > this.recevedСomission;
    },
    isCommissionPaid() {
      return this.expectedComission === this.recevedСomission;
    },
    isCommissionOverpaid() {
      return this.recevedСomission > this.expectedComission;
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
