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
    <span class="approved-dispute" v-if="isApprovedDispute">{{ $t('orders.disputed') }}</span>
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';

const APPROVED_DISPUTE_STATUS = 'Approved';
const DRAFT_DISPUTE_STATUS = 'Re-sent';
const SENT_DISPUTE_STATUS = 'Sent';

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
    isApprovedDispute() {
      return [APPROVED_DISPUTE_STATUS, SENT_DISPUTE_STATUS].includes(
        (this.item.disputeStatus || {}).name
      );
    },
    isDraftDispute() {
      return (this.item.disputeStatus || {}).name === DRAFT_DISPUTE_STATUS;
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
