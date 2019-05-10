<template>
  <div class="difference-comisson-cell">
    <span
      v-if="!isUnknowComission"
      :class="{
        'positive-difference': isPositiveDifference,
        'negative-difference': isNegativeDifference,
        'equal-zero-difference': isEqualZeroDifference,
      }"
      >{{ unsignedDifferenceСomission | currency }}</span
    >
    <span v-else>-</span>
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
    isUnknowComission() {
      return this.item.expectedComission === null || this.item.recevedСomission === null;
    },
    expectedComission() {
      return this.item.expectedComission ? parseFloat(this.item.expectedComission) : 0;
    },
    recevedСomission() {
      return this.item.recevedСomission ? parseFloat(this.item.recevedСomission) : 0;
    },
    unsignedDifferenceСomission() {
      return Math.abs(this.differenceСomission);
    },
    differenceСomission() {
      return this.expectedComission - this.recevedСomission;
    },
    isPositiveDifference() {
      return this.differenceСomission > 0;
    },
    isEqualZeroDifference() {
      return this.differenceСomission === 0;
    },
    isNegativeDifference() {
      return this.differenceСomission < 0;
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
