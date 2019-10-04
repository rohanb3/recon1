<template>
  <div class="dispute-status-description-cell" :title="disputeComment">
    {{ disputeComment | dashForEmptyValue }}
  </div>
</template>

<script>
import dashForEmptyValue from '@/filters/dashForEmptyValue';

export default {
  name: 'DisputeStatusDescriptionCell',
  props: {
    item: {
      type: Object,
    },
  },
  filters: {
    dashForEmptyValue,
  },
  computed: {
    disputeComment() {
      return this.item.submitterComment || this.item.statusDescription;
    },
  },
};
</script>

<style lang="scss" scoped>
.dispute-status-description-cell {
  font-style: italic;
}
</style>
