<template>
  <div class="price-cell">{{ value | currency }}</div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import currency from '@/filters/currency';

export default {
  name: 'PriceCell',
  mixins: [nestedFieldCell],
  filters: {
    currency,
  },
};
</script>
