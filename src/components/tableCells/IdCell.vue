<template>
  <div class="id-cell">
    <a href="#" @click.prevent.stop="$emit('selectId', value)">{{ value }}</a>
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';

export default {
  name: 'IdCell',
  mixins: [nestedFieldCell],
};
</script>
