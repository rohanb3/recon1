<template>
  <div class="default-cell">{{ value | numberSign }}</div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import { numberSign } from '@/filters/numberFormat';

export default {
  name: 'OrderNumberCell',
  mixins: [nestedFieldCell],
  filters: {
    numberSign,
  },
};
</script>
