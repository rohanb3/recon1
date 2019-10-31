<template>
  <div class="dispute-status-description-cell" :title="disputeComment">
    <PopupDescriptionCell :disputeComment="disputeComment">
      <template v-slot:comment>
        <a @click.prevent>
          {{ disputeComment }}
        </a>
      </template>
    </PopupDescriptionCell>
  </div>
</template>

<script>
import PopupDescriptionCell from '@/components/Popups/PopupDescriptionCell';

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
