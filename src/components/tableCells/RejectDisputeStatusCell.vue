<template>
  <div class="resubmit-claim-cell">
    <table-button
      v-if="isInprogressStatus"
      class="disput-button"
      :title="$t('reject')"
      :disabled="isStatusEditableOrStatusProcessing"
      :preloader="statusProcessing"
      @click="onResubmit"
    />
    <span
      v-if="!isInprogressStatus && isContainsRejectedStatus"
      :title="rejectDate | dateDefaultFormat"
      >{{ rejectDate | dateYearMonthDay }}</span
    >
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';
import disputeStatusAutocomplete from '@/mixins/disputeStatusAutocomplete';
import { DISPUTE_STATUSES_ID } from '@/constants';

export default {
  name: 'RejectDisputeStatusCell',
  mixins: [disputeStatusAutocomplete],
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
    rejectDate() {
      return this.getLastDisputeStatus(DISPUTE_STATUSES_ID.REJECTED).timeStamp || '';
    },
    isContainsRejectedStatus() {
      return this.isContainsStatusInHistory(DISPUTE_STATUSES_ID.REJECTED);
    },
  },
  methods: {
    onResubmit() {
      this.$emit('confirmRejectDisputeStatus', {
        id: this.item.id,
        statusId: DISPUTE_STATUSES_ID.REJECTED,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.resubmit-claim-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .disput-button {
    line-height: 0;
    &:not(.disabled-button) {
      border: 1px solid $base-red;
      color: $base-red;

      &.brown-button {
        color: $button-brown-color;
      }
    }
  }
}
</style>
