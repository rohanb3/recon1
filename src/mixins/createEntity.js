import { addBackgroundBlur, removeBackgroundBlur } from '@/services/background';

import { DISPUTE_STATUSES_ID } from '@/constants';

export default {
  mounted() {
    this.loadData();
  },
  data() {
    return {
      disputeInfo: {},
      disputeAttachmentList: [],
      dialogDeleteDispute: false,
      loading: true,
      loadingSaveAsDraft: false,
      loadingRemoveDraft: false,
      sendingData: false,
      loadingFilesStatus: false,
      savedDispute: false,
    };
  },
  computed: {
    disputeId() {
      return this.disputeInfo.id;
    },
    disputeStatusId: {
      get() {
        return (this.disputeInfo.status || {}).id;
      },
      set(statusId) {
        this.disputeInfo.status.id = statusId;
      },
    },
    disputeTypeId() {
      return (this.disputeInfo.type || {}).id;
    },
    isDisputeStatusSent() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.SENT;
    },
  },
  methods: {
    onSaveDraft() {
      this.disputeStatusId = DISPUTE_STATUSES_ID.DRAFT;
      removeBackgroundBlur();
      this.onSave();
    },
    onCancel() {
      addBackgroundBlur();
      this.dialogDeleteDispute = true;
    },
    onCloseDialog() {
      removeBackgroundBlur();
      this.dialogDeleteDispute = false;
    },
    async onCreateNewDispute() {
      this.disputeStatusId = DISPUTE_STATUSES_ID.SENT;
      this.onSave();
    },
    validate() {
      return [
        this.$refs.generalInfo.validate(),
        this.$refs.additionalInfoBlock.validate(),
        this.$refs.customerInfo.validate(),
      ].every(isValidForm => isValidForm === true);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.savedDispute) {
      next();
    } else {
      this.routeNameForRedirect = to.name;
      this.onCancel();
      next(false);
    }
  },
};
