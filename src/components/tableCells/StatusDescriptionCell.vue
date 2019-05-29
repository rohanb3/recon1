<template>
  <div class="status-description-cell">
    <span v-if="value">{{ value }}</span>
    <span v-else>-</span>
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';

export default {
  name: 'StatusDescriptionCell',
  mixins: [nestedFieldCell],
};
</script>

<style lang="scss" scoped>
.status-description-cell {
  font-style: italic;
}
</style>
