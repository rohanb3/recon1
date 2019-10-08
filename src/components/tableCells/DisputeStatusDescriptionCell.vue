<template>
  <div class="dispute-status-description-cell" :title="disputeComment">
    <PopupDescriptionCell
      :statusDescription="statusDescription"
      :shadowClassName="shadowClassName"
    >
      <template v-slot:comment>
        <a @click.prevent>
          {{ disputeComment | dashForEmptyValue }}
        </a>
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
    shadowClassName() {
      return this.item.statusDescription
        ? 'application--wrap'
        : 'dispute-history';
    },
  },
};
</script>

<style lang="scss" scoped>
.dispute-status-description-cell {
  font-style: italic;
}
</style>
