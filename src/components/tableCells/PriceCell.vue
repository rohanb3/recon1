<template>
  <div class="price-cell">{{ value | dollar }}</div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import { dollar } from '@/filters/currency';

export default {
  name: 'PriceCell',
  mixins: [nestedFieldCell],
  filters: {
    dollar,
  },
};
</script>
