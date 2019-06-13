<template>
  <div class="resubmit-claim-cell">
    <table-button
      v-if="isSentOrResentStatus"
      class="disput-button"
      :title="$t('resubmit')"
      :disabled="isDenyResubmitOrStatusProcessing"
      :preloader="statusProcessing"
      @click="onResubmit"
    />
    <span
      v-if="!isSentOrResentStatus && isContainsInprogressStatus"
      :title="resubmitDate | dateDefaultFormat"
      >{{ resubmitDate | dateYearMonthDay }}</span
    >
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';
import disputeStatusAutocomplete from '@/mixins/disputeStatusAutocomplete';
import { DISPUTE_STATUSES_ID, SCOPES } from '@/constants';

export default {
  name: 'ResubmitClaimCell',
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
    statusProcessing: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    TableButton,
  },
  computed: {
    isSentOrResentStatus() {
      return this.isSentStatus || this.isResentStatus;
    },
    resubmitDate() {
      return this.getLastDisputeStatus(DISPUTE_STATUSES_ID.IN_PROGRESS).timeStamp || '';
    },
    isContainsInprogressStatus() {
      return this.isContainsStatusInHistory(DISPUTE_STATUSES_ID.IN_PROGRESS);
    },
    isDenyResubmit() {
      return !this.scopes.includes(SCOPES.DISPUTE_PATCH);
    },
    isDenyResubmitOrStatusProcessing() {
      return this.isDenyResubmit || this.statusProcessing;
    },
  },
  methods: {
    onResubmit() {
      this.$emit('changeDisputeStatus', {
        disputeId: this.item.id,
        statusId: DISPUTE_STATUSES_ID.IN_PROGRESS,
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
    &.brown-button {
      color: $button-brown-color;
    }
  }
}
</style>
