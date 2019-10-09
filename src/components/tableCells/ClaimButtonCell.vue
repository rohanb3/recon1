<template>
  <div class="dispute-button-cell">
    <table-button
      v-if="item.disputeStatus === null"
      class="disput-button"
      :title="$t('orders.new.claim')"
      :disabled="isNewDisputeDisabled"
      @click="onNewDispute"
    />
    <table-button
      v-if="isDraftDispute"
      class="disput-button brown-button"
      :title="$t('orders.restore.draft')"
      :disabled="isRestoreDisputeDraftDisabled"
      @click="onRestoreDraft"
    />
    <span class="approved-dispute" v-if="isDisputed">{{ $t('orders.claimed') }}</span>
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';

import { DISPUTE_STATUSES_ID, SCOPES, ROUTE_NAMES } from '@/constants';

export default {
  name: 'DisputeButtonCell',
  props: {
    item: {
      type: Object,
      required: true,
    },
    scopes: {
      type: Array,
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
      return !this.isDraftDispute && this.statusId;
    },
    isDraftDispute() {
      return this.statusId === DISPUTE_STATUSES_ID.DRAFT;
    },
    isNewDisputeDisabled() {
      return !this.scopes.includes(SCOPES.DISPUTE_CREATE);
    },
    isRestoreDisputeDraftDisabled() {
      return !this.scopes.includes(SCOPES.DISPUTE_UPDATE);
    },
  },
  methods: {
    onRestoreDraft() {
      this.$router.push({
        name: ROUTE_NAMES.EDIT_CLAIM,
        params: { disputeId: this.item.disputeId },
      });
    },
    onNewDispute() {
      this.$router.push({
        name: ROUTE_NAMES.CREATE_CLAIM,
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
  }
  .disput-button:not(.disabled-button) {
    &.brown-button {
      color: $button-brown-color;
    }
  }
}
</style>
