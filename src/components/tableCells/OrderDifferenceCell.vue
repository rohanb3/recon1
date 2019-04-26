<template>
  <div class="order-difference-cell">
    {{ difference | dollar }}
  </div>
</template>

<script>
import { dollar } from '@/filters/currency';

export default {
  name: 'OrderDifference',
  props: {
    item: {
      type: Object,
    },
  },
  filters: {
    dollar,
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
