<template>
  <div class="difference-comisson-cell">
    <span
      :class="{
        'positive-difference': isPositiveDifference,
        'negative-difference': isNegativeDifference,
        'equal-zero-difference': isEqualZeroDifference,
      }"
      >{{ unsignedDifferenceComission | currency }}</span
    >
  </div>
</template>

<script>
import currency from '@/filters/currency';

export default {
  name: 'DifferenceComissonCell',
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
    unsignedDifferenceComission() {
      return Math.abs(this.differenceComission);
    },
    differenceComission() {
      return this.expectedCommission - this.receivedCommission;
    },
    isPositiveDifference() {
      return this.differenceComission > 0;
    },
    isEqualZeroDifference() {
      return this.differenceComission === 0;
    },
    isNegativeDifference() {
      return this.differenceComission < 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.positive-difference {
  color: $base-red;
  opacity: 0.6;
}

.equal-zero-difference {
  color: $base-green-text;
}

.negative-difference {
  color: $base-blue;
}
</style>
