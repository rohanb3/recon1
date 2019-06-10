<template>
  <div class="dispute-status-description-cell">
    {{ submitterComment }}
  </div>
</template>

<script>
import disputeStatusAutocomplete from '@/mixins/disputeStatusAutocomplete';

export default {
  name: 'DisputeStatusDescriptionCell',
  mixins: [disputeStatusAutocomplete],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    submitterComment() {
      return (this.disputeStatusHistoryList.slice().pop() || {}).submitterComment;
    },
  },
};
</script>
