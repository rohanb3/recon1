<template>
  <div class="order-difference-cell">
    {{ difference | currency }}
  </div>
</template>

<script>
import currency from '@/filters/currency';

export default {
  name: 'orderDifference',
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
    difference() {
      return Math.abs(this.expectedComission - this.recevedComission);
    },
  },
};
</script>
