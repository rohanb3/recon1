<template>
  <div class="dispute-status-description-cell" :title="disputeComment">{{ disputeComment }}</div>
</template>

<script>
export default {
  name: 'DisputeStatusDescriptionCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    disputeComment() {
      return this.item.disputeStatusDescription || this.item.submitterComment;
    },
  },
};
</script>

<style lang="scss" scoped>
.dispute-status-description-cell {
  font-style: italic;
}
</style>
