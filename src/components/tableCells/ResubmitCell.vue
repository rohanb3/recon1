<template>
  <div class="resubmit-cell">
    <table-button
      v-if="isSentOrResentStatus"
      class="disput-button"
      :title="$t('resubmit')"
      :disabled="isStatusNotEditableOrStatusProcessing"
      :preloader="statusProcessing"
      @click="onResubmit"
    />
    <span v-if="!isSentOrResentStatus && wasInProgress" :title="resubmitDate | dateDefaultFormat">{{
      resubmitDate | dateYearMonthDay
    }}</span>
  </div>
</template>

<script>
import TableButton from '@/components/TableButton';
import disputeStatusAutocomplete from '@/mixins/disputeStatusAutocomplete';
import { DISPUTE_STATUSES_ID } from '@/constants';

export default {
  name: 'ResubmitCell',
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
    isSentOrResentStatus() {
      return this.isSentStatus || this.isResentStatus;
    },
    resubmitDate() {
      return this.item.lastInProgressTime || '';
    },
  },
  methods: {
    onResubmit() {
      this.$emit('changeDisputeStatus', {
        id: this.item.id,
        statusId: DISPUTE_STATUSES_ID.IN_PROGRESS,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.resubmit-cell {
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
