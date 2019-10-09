import { dateYearMonthDay, dateDefaultFormat } from '@/filters/dateFormat';
import { DISPUTE_STATUSES_ID, SCOPES } from '@/constants';

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
    isRejectedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.REJECTED;
    },
    statusChangedOn() {
      return this.item.statusChangedOn || '';
    },
    isApprovedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.APPROVED;
    },
    isConfirmApprovedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.CONFIRM_APPROVED;
    },
    isConfirmRejectedStatus() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.CONFIRM_REJECTED;
    },
    wasInProgress() {
      return this.item.lastInProgressTime !== '';
    },
    isStatusEditableBySAM() {
      return this.scopes.includes(SCOPES.DISPUTE_PATCH_SAM);
    },
    isStatusNotEditableOrStatusProcessing() {
      return this.isStatusEditableBySAM || this.statusProcessing;
    },
    statusProcessing() {
      return this.processingIds.includes(this.disputeId);
    },
  },
};
