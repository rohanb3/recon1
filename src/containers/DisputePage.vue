<template>
  <v-container fluid grid-list-md class="dispute-page">
    <div class="dispute-page-wrapper" :class="{ blurred: dialogDeleteDispute || loading }">
      <div class="dispute-toolbar">
        <div class="dispute-title">{{ $t('dispute.page.title') }}</div>
      </div>
      <v-layout row wrap>
        <v-flex xs12 lg6 class="general-information-form">
          <general-information-form v-model="disputeInfo" ref="generalInfo" />
          <additional-info-block-form v-model="disputeInfo" ref="additionalInfoBlock" />
        </v-flex>
        <v-flex xs12 lg6 class="customer-information-wrapper">
          <customer-information-form
            v-model="disputeInfo"
            ref="customerInfo"
            :service-list="serviceList"
          />
          <div class="save-button-wrapper">
            <v-btn small depressed class="button-cancel-dispute" @click="onCancel">
              {{ $t('cancel') }}
            </v-btn>
            <v-btn small depressed class="button-save-dispute" @click="onSave">{{
              $t('save.as.draft')
            }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn small depressed class="button-create-dispute" @click="onSave">{{
              $t('create.new.dispute')
            }}</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <v-dialog v-model="dialogDeleteDispute" persistent max-width="370">
      <v-card class="dialog-delete-dispute">
        <v-icon class="close-dialog" @click="dialogDeleteDispute = false">close</v-icon>
        <v-card-title class="headline">{{ $t('dispute.are.you.sure') }}</v-card-title>
        <v-card-text class="description">{{ $t('dispute.if.you.close.this.page') }}</v-card-text>
        <v-card-actions class="card-buttons">
          <table-button class="button-save-draft" :title="$t('save.as.draft')" @click="onSave" />
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
import { STATUS_OK } from '@/constants/responseStatuses';

import {
  getDispute,
  creatDispute,
  updateDispute,
  deleteDispute,
} from '@/services/disputesRepository';
import { getServiceList } from '@/services/ordersRepository';

export default {
  name: 'DisputePage',
  components: {
    TableButton,
    AdditionalInfoBlockForm,
    CustomerInformationForm,
    GeneralInformationForm,
  },
  mounted() {
    this.loadDispute();
    this.loadServiceList();
  },
  data() {
    return {
      disputeInfo: {},
      serviceList: [],
      dialogDeleteDispute: false,
      loading: true,
    };
  },
  methods: {
    async onSave() {
      try {
        if (this.validate()) {
          const { status } = await updateDispute(this.disputeInfo.id, {
            ...this.disputeInfo,
            disputeId: this.disputeInfo.id,
          });

          if (status === STATUS_OK) {
            this.$router.push({ name: 'select-order' });
          } else throw new Error();
        }
      } catch {
        this.$notify({
          group: 'notifications',
          title: this.$t('something.went.wrong'),
          type: 'error',
        });
      }
    },
    async onRemoveDraft() {
      try {
        const status = await deleteDispute(this.disputeInfo.id);

        if (status === STATUS_OK) {
          this.$router.push({ name: 'select-order' });
        } else throw new Error();
      } catch {
        this.$notify({
          group: 'notifications',
          title: this.$t('something.went.wrong'),
          type: 'error',
        });
      }
    },
    onCancel() {
      this.dialogDeleteDispute = true;
    },
    async loadDispute() {
      this.loading = true;
      try {
        if (this.$route.params.disputeId) {
          const data = await getDispute(this.$route.params.disputeId);
          this.disputeInfo = data;
        } else {
          const data = await creatDispute(this.$route.params.orderId);
          this.disputeInfo = data;
        }
      } catch {
        this.$notify({
          group: 'notifications',
          title: this.$t('something.went.wrong'),
          type: 'error',
        });
      } finally {
        this.loading = false;
      }
    },
    loadServiceList() {
      getServiceList().then(data => {
        this.serviceList = data;
      });
    },
    validate() {
      return [
        this.$refs.generalInfo.validate(),
        this.$refs.additionalInfoBlock.validate(),
        this.$refs.customerInfo.validate(),
      ].every(isValidForm => isValidForm === true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
@import '@/assets/styles/extends.scss';

.dispute-page {
  @include table-base-container;
  height: 95vh;
  margin: 20px;
  @extend %blurred-this;

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

  .big-spinner {
    position: absolute;
    top: 40%;
    left: 50%;
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

  .v-menu__content {
    top: 0 !important;
    left: 0 !important;
    @extend %thin-scrollbar;
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
  height: 90vh;
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
