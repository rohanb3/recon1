<template>
  <div class="dispute-status-description-cell" :title="filteredValue">{{ filteredValue }}</div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';

export default {
  name: 'DisputeStatusDescriptionCell',
  mixins: [nestedFieldCell],
};
</script>

<style lang="scss" scoped>
.dispute-status-description-cell {
  font-style: italic;
}
</style>
