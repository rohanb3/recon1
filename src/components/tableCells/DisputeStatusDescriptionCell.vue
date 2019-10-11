<template>
  <div class="dispute-status-description-cell" :title="disputeComment">
    <PopupDescriptionCell :showPopup="disputeComment" :statusDescription="statusDescription">
      <template v-slot:comment>
        <a @click.prevent>
          {{ disputeComment }}
        </a>
      </template>
      <template v-slot:emptyComment>
        <div class="empty-comment">
          {{ disputeComment | dashForEmptyValue }}
        </div>
      </template>
    </PopupDescriptionCell>
  </div>
</template>

<script>
import PopupDescriptionCell from '@/components/Popups/PopupDescriptionCell';
import dashForEmptyValue from '@/filters/dashForEmptyValue';

export default {
  name: 'DisputeStatusDescriptionCell',
  components: {
    PopupDescriptionCell,
  },
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
    statusDescription() {
      return this.item.statusDescription || this.item.submitterComment;
    },
  },
};
</script>

<style lang="scss" scoped>
.dispute-status-description-cell {
  font-style: italic;
}

.empty-comment {
  text-align: center;
  cursor: default;
}
</style>
