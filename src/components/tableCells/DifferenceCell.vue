<template>
  <div class="difference-cell" :class="{ 'red-color': isNegative }">{{ getValue | currency }}</div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import currency from '@/filters/currency';

export default {
  name: 'DifferenceCell',
  mixins: [nestedFieldCell],
  filters: {
    currency,
  },
  computed: {
    isNegative() {
      return this.value < 0;
    },
    getValue() {
      return Math.abs(this.value);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.red-color {
  color: $base-red;
}
</style>
