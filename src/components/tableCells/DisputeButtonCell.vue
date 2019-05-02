<template>
  <div class="dispute-button-cell">
    <router-link :to="{ name: 'creat-dispute', params: { orderId: item.orderId } }">
      <table-button
        class="disput-button"
        v-if="item.disputeStatus === null"
        :title="$t('orders.new.dispute')"
      />
    </router-link>
    <router-link :to="{ name: 'edit-dispute', params: { disputeId: item.disputeId } }">
      <table-button
        class="disput-button brown-button"
        v-if="isDraftDispute"
        :title="$t('orders.restore.draft')"
      />
    </router-link>
    <span class="approved-dispute" v-if="isApprovedDispute">{{ $t('orders.disputed') }}</span>
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';

const APPROVED_DISPUTE_STATUS = 'Approved';
const DRAFT_DISPUTE_STATUS = 'Re-sent';

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
      return (this.item.disputeStatus || {}).name === APPROVED_DISPUTE_STATUS;
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
