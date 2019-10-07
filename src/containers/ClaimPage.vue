<template>
  <v-container fluid grid-list-md class="dispute-page">
    <div class="dispute-page-wrapper" :class="{ blurred: loading }">
      <div class="dispute-toolbar">
        <div class="dispute-title">{{ $t('dispute.page.title') }}</div>
      </div>
      <v-layout row wrap>
        <v-flex xs12 lg6 class="general-information-form">
          <general-information-form v-model="disputeInfo" ref="generalInfo" />
          <additional-info-block-form
            v-model="disputeInfo"
            ref="additionalInfoBlock"
            :loadingFilesStatus="loadingFilesStatus"
            @selectedFiles="onUploadFiles"
            @removeFile="onRemoveFile"
          />
        </v-flex>
        <v-flex xs12 lg6 class="customer-information-wrapper">
          <customer-information-form v-model="disputeInfo" ref="customerInfo" />
          <div class="save-button-wrapper">
            <v-btn small depressed class="button-cancel-dispute" @click="onCancel">
              {{ $t('cancel') }}
            </v-btn>
            <v-btn small depressed class="button-save-dispute" @click="onSaveDraft">{{
              $t('save.as.draft')
            }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn small depressed class="button-create-dispute" @click="onCreateNewDispute">{{
              $t('create.new.dispute')
            }}</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <v-dialog v-model="dialogDeleteDispute" persistent max-width="370">
      <v-card class="dialog-delete-dispute">
        <v-icon class="close-dialog" @click="onCloseDialog">close</v-icon>
        <v-card-title class="headline">{{ $t('dispute.are.you.sure') }}</v-card-title>
        <v-card-text class="description">{{ $t('dispute.if.you.close.this.page') }}</v-card-text>
        <v-card-actions class="card-buttons">
          <table-button
            class="button-save-draft"
            :title="$t('save.as.draft')"
            @click="onSaveDraft"
          />
          <span class="remove-draft" @click="onRemoveDraft">{{ $t('remove.draft') }}</span>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-progress-circular
      v-if="loading"
      class="big-spinner"
      :size="70"
      :width="7"
      color="blue"
      indeterminate
    ></v-progress-circular>
  </v-container>
</template>

<script>
import AdditionalInfoBlockForm from '@/components/AdditionalInfoBlockForm';
import CustomerInformationForm from '@/components/CustomerInformationForm';
import GeneralInformationForm from '@/components/GeneralInformationForm';
import TableButton from '@/components/TableButton';
import { errorMessage } from '@/services/notifications';
import { addBackgroundBlur, removeBackgroundBlur } from '@/services/background';

import { RESPONSE_STATUSES, DISPUTE_STATUSES_ID, ROUTE_NAMES } from '@/constants';

import {
  getDispute,
  deleteDispute,
  uploadDisputeAttachment,
  removeDisputeAttachment,
  createClaim,
  updateClaim,
} from '@/services/disputesRepository';

export default {
  name: 'ClaimPage',
  components: {
    TableButton,
    AdditionalInfoBlockForm,
    CustomerInformationForm,
    GeneralInformationForm,
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
      routeNameForRedirect: ROUTE_NAMES.CLAIMS_ORDERS,
    };
  },
  computed: {
    disputeId() {
      return this.disputeInfo.id;
    },
    disputeStatusId: {
      get() {
        return (this.disputeInfo.claimStatus || {}).id;
      },
      set(statusId) {
        this.disputeInfo.disputeStatus.id = statusId;
      },
    },
    disputeTypeId() {
      return (this.disputeInfo.claimType || {}).id;
    },
    isDisputeStatusSent() {
      return this.disputeStatusId === DISPUTE_STATUSES_ID.SENT;
    },
  },
  methods: {
    async onSave() {
      if (this.isDisputeStatusSent && !this.validate()) {
        return;
      }

      this.sendingData = true;
      try {
        await updateClaim(this.disputeInfo.id, {
          ...this.disputeInfo,
          disputeId: this.disputeId,
          disputeStatusId: this.disputeStatusId,
          disputeTypeId: this.disputeTypeId,
        });
        this.savedDispute = true;
        this.$router.push({ name: this.routeNameForRedirect });
      } catch {
        errorMessage();
      } finally {
        this.sendingData = false;
      }
    },
    onSaveDraft() {
      this.disputeStatusId = DISPUTE_STATUSES_ID.DRAFT;
      removeBackgroundBlur();
      this.onSave();
    },
    async onRemoveDraft() {
      try {
        await deleteDispute(this.disputeInfo.id);
        this.savedDispute = true;
        this.$router.push({ name: this.routeNameForRedirect });
      } catch {
        errorMessage();
      } finally {
        removeBackgroundBlur();
      }
    },
    onCancel() {
      addBackgroundBlur();
      this.dialogDeleteDispute = true;
    },
    onCloseDialog() {
      removeBackgroundBlur();
      this.dialogDeleteDispute = false;
    },
    async loadDispute() {
      this.loading = true;
      const { disputeId, orderId } = this.$route.params;
      try {
        if (disputeId) {
          this.disputeInfo = await getDispute(disputeId);
        } else {
          this.disputeInfo = await createClaim(orderId);
        }
      } catch (e) {
        if ((e.response || {}).status === RESPONSE_STATUSES.NOT_FOUND) {
          this.$router.push({ name: this.routeNameForRedirect });
        } else {
          errorMessage();
        }
      } finally {
        this.loading = false;
      }
    },
    async onCreateNewDispute() {
      this.disputeStatusId = DISPUTE_STATUSES_ID.SENT;
      this.onSave();
    },
    async onRemoveFile(filename) {
      try {
        await removeDisputeAttachment(this.disputeInfo.id, filename);
        await this.loadSttachments();
      } catch {
        errorMessage();
      }
    },
    async onUploadFiles(files) {
      this.loadingFilesStatus = true;
      try {
        const uploadFileList = [].map.call(files, file => {
          const formData = new FormData();
          formData.append('attachments', file, file.name);
          return uploadDisputeAttachment(this.disputeInfo.id, formData);
        });

        await Promise.all(uploadFileList);
        await this.loadSttachments();
      } catch (e) {
        const {
          response: { status },
        } = e;

        if (status === RESPONSE_STATUSES.REQUEST_ENTITY_TOO_LARGE) {
          errorMessage('failed.to.upload.file', 'file.is.too.big');
        } else {
          errorMessage('failed.to.upload.file');
        }
      } finally {
        this.loadingFilesStatus = false;
      }
    },
    async loadSttachments() {
      const { attachments } = await getDispute(this.disputeInfo.id);
      this.disputeInfo.attachments = attachments;
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
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.dispute-page {
  @include table-base-container;
  height: 100%;
  @extend %blurred-this;

  .dispute-page-wrapper {
    height: 100vh;
    max-height: calc(100vh - 150px);
  }

  .big-spinner {
    position: absolute;
    top: 40%;
    left: 50%;
  }
}

.dialog-delete-dispute {
  padding: 12px;
  max-width: 370px;

  .headline {
    font-weight: 500;
    font-size: 20px !important;
    padding-bottom: 0;
  }

  .close-dialog {
    position: absolute;
    top: 21px;
    right: 21px;
    cursor: pointer;
    opacity: 0.2;
    color: $base-text-color;
  }

  .card-buttons {
    padding: 10px 17px 28px 17px;
  }

  .description {
    color: $base-text-color;
    font-size: 14px;
    opacity: 0.5;
    line-height: 1.36;
    font-weight: normal;
  }

  .button-save-draft {
    height: 28px;
    font-size: 14px;
    font-weight: normal;
    padding: 0 12px;
    margin-right: 24px;
  }

  .remove-draft {
    font-size: 14px;
    cursor: pointer;
    color: $base-red;
  }
}

.dispute-page /deep/ {
  .v-dialog {
    border-radius: 8px;
  }

  .required label::after {
    content: ' *';
    opacity: 0.6;
    color: $base-red;
  }

  .v-select__slot {
    .v-icon {
      color: $base-blue;
    }
  }

  .error--text {
    color: $base-red;
  }

  .date-field {
    .v-text-field__slot {
      input {
        color: $base-black;
      }
    }
  }

  .v-text-field__slot {
    label:not(.error--text) {
      color: $bright-grey;
    }
  }
}

.dispute-page-wrapper {
  overflow: hidden;
  overflow-y: auto;
  height: 100%;
  @extend %thin-scrollbar;
}

.dispute-toolbar {
  @include table-base-toolbar;
  padding: 0;
}

.dispute-title {
  @include table-base-title;
}

.save-button-wrapper {
  display: flex;
  margin: 20px;

  .v-btn--depressed {
    color: $base-white;
    text-transform: none;

    &.button-cancel-dispute {
      background: $button-blue-color;
    }

    &.button-save-dispute {
      background: $button-yellow-color;
    }

    &.button-create-dispute {
      background: $base-green;
    }
  }
}

.customer-information-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>