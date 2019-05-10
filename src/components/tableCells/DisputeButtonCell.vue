<template>
  <div class="dispute-button-cell">
    <table-button
      v-if="item.disputeStatus === null"
      class="disput-button"
      :title="$t('orders.new.dispute')"
      @click="onNewDispute"
    />
    <table-button
      v-if="isDraftDispute"
      class="disput-button brown-button"
      :title="$t('orders.restore.draft')"
      @click="onRestoreDraft"
    />
    <span class="approved-dispute" v-if="isDisputed">{{ $t('orders.disputed') }}</span>
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';

import { DISPUTE_STATUSES_ID } from '@/constants';

export default {
  name: 'DisputeButtonCell',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    TableButton,
  },
  computed: {
    statusId() {
      return (this.item.disputeStatus || {}).id;
    },
    isDisputed() {
      return this.statusId === DISPUTE_STATUSES_ID.SENT;
    },
    isDraftDispute() {
      return this.statusId === DISPUTE_STATUSES_ID.DRAFT;
    },
  },
  methods: {
    onRestoreDraft() {
      this.$router.push({
        name: 'edit-dispute',
        params: { disputeId: this.item.disputeId },
      });
    },
    onNewDispute() {
      this.$router.push({
        name: 'creat-dispute',
        params: { orderId: this.item.orderId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.dispute-button-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .approved-dispute {
    color: $base-red;
    font-weight: 500;
  }

  .disput-button {
    line-height: 0;
    &.brown-button {
      color: $button-brown-color;
    }
  }
}
</style>
