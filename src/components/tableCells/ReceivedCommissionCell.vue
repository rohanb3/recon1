<template>
  <div class="price-cell">
    <a @click.prevent="$emit('getReceivedCommission', item.orderId)">{{ value | currency }}</a>
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import currency from '@/filters/currency';

export default {
  name: 'ReceivedCommissionCell',
  mixins: [nestedFieldCell],
  data() {
    return {
      show: false,
    };
  },
  filters: {
    currency,
  },
};
</script>
