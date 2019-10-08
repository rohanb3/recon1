import CustomerInformationForm from '@/components/CustomerInformationForm';
import TableButton from '@/components/TableButton';
import { addBackgroundBlur, removeBackgroundBlur } from '@/services/background';

import { DISPUTE_STATUSES_ID } from '@/constants';

import GeneralInformationFormDispute from '@/components/GeneralInformationFormDispute';
import DisputeTypesSelect from '@/containers/DisputeTypesSelect';
import DisputeCommentTable from '@/containers/DisputeCommentTable';
import AdditionalInfoBlockForm from '@/components/AdditionalInfoBlockForm';
import ClaimTypesSelect from '@/containers/ClaimTypesSelect';

export default {
  components: {
    AdditionalInfoBlockForm,
    DisputeCommentTable,
    DisputeTypesSelect,
    GeneralInformationFormDispute,
    TableButton,
    CustomerInformationForm,
    ClaimTypesSelect,
  },
  mounted() {
    this.loadDispute();
  },
  data() {
    return {
      disputeInfo: {},
      disputeAttachmentList: [],
      dialogDeleteDispute: false,
      loading: true,
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
