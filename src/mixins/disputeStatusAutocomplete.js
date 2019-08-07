import { dateYearMonthDay, dateDefaultFormat } from '@/filters/dateFormat';
import { DISPUTE_STATUSES_ID } from '@/constants';
import { sortingRuleForObject } from '@/services/utils';

export default {
  filters: {
    dateYearMonthDay,
    dateDefaultFormat,
  },
  computed: {
    disputeStatusId() {
      return (this.item.disputeStatus || {}).id;
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
      return this.item.disputeStatusHistory || [];
    },
    isConfirmApprovedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.CONFIRM_APPROVED;
    },
    isConfirmRejectedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.CONFIRM_REJECTED;
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
