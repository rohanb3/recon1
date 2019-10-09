import { dateYearMonthDay, dateDefaultFormat } from '@/filters/dateFormat';
import { DISPUTE_STATUSES_ID, SCOPES } from '@/constants';
import { sortingRuleForObject } from '@/services/utils';

export default {
  props: {
    scopes: {
      type: Array,
      required: true,
    },
    processingIds: {
      type: Array,
      required: true,
    },
  },
  filters: {
    dateYearMonthDay,
    dateDefaultFormat,
  },
  computed: {
    disputeId() {
      return this.item.id;
    },
    disputeStatusId() {
      return (this.item.status || {}).id;
    },
    isSentStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.SENT;
    },
    isResentStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.RE_SENT;
    },
    isInprogressStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.IN_PROGRESS;
    },
    disputeStatusHistoryList() {
      return this.item.statusHistory || [];
    },
    isConfirmApprovedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.CONFIRM_APPROVED;
    },
    isConfirmRejectedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.CONFIRM_REJECTED;
    },
    isStatusEditableBySAM() {
      return this.scopes.includes(SCOPES.DISPUTE_PATCH_SAM);
    },
    isStatusNotEditableOrStatusProcessing() {
      return !this.isStatusEditableBySAM || this.statusProcessing;
    },
    statusProcessing() {
      return this.processingIds.includes(this.disputeId);
    },
  },
  methods: {
    getLastDisputeStatus(statusId) {
      return this.disputeStatusHistoryList
        .filter(disputeStatus => {
          return ((disputeStatus || {}).status || {}).id === statusId;
        })
        .sort(sortingRuleForObject('timeStamp'))
        .pop();
    },
    isContainsStatusInHistory(statusId) {
      return this.disputeStatusHistoryList.some(
        disputeStatus => ((disputeStatus || {}).status || {}).id === statusId
      );
    },
  },
};
