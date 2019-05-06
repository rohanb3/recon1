<template>
  <div class="dispute-button-cell">
    <router-link
      v-if="item.disputeStatus === null"
      :to="{ name: 'creat-dispute', params: { orderId: item.orderId } }"
    >
      <table-button class="disput-button" :title="$t('orders.new.dispute')" />
    </router-link>
    <router-link
      v-if="isDraftDispute"
      :to="{ name: 'edit-dispute', params: { disputeId: item.disputeId } }"
    >
      <table-button class="disput-button brown-button" :title="$t('orders.restore.draft')" />
    </router-link>
    <span class="approved-dispute" v-if="isDisputed">{{ $t('orders.disputed') }}</span>
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';

import { SENT_DISPUTE_STATUS, DRAFT_DISPUTE_STATUS } from '@/constants/disputeStatus';

export default {
  name: 'DisputeButtonCell',
  props: {
    item: {
      type: Object,
    },
  },
  components: {
    TableButton,
  },
  computed: {
    statusName() {
      return (this.item.disputeStatus || {}).name;
    },
    isDisputed() {
      return this.statusName === SENT_DISPUTE_STATUS;
    },
    isDraftDispute() {
      return this.statusName === DRAFT_DISPUTE_STATUS;
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
