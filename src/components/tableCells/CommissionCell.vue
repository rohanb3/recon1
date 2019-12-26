<template>
  <div class="commission-cell">
    <a @click.prevent="$emit('input', item.orderId)">{{ value | currency }}</a>
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import currency from '@/filters/currency';

export default {
  name: 'CommissionCell',
  mixins: [nestedFieldCell],
  filters: {
    currency,
  },
};
</script>
