<template>
  <div class="general-information-from">
    <div class="general-information-title">{{ $t('dispute.general.information') }}</div>
    <v-form ref="form">
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            :value="affiliateName"
            disabled
            :label="$t('dispute.affiliate.name')"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            :value="affiliateId"
            disabled
            :label="$t('dispute.affiliate.id')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <FieldAccountNumber ref="fieldAccountNumber" v-model="disputeInfo" />
        </v-flex>
        <v-flex md6 ml-5>
          <FieldOrderConfirmation v-model="disputeInfo" />
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <FieldWoNumber ref="fieldWoNumber" v-model="disputeInfo" />
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            v-model="fiscalPeriod"
            disabled
            :label="$t('dispute.fiscal.period')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            :value="createdOn | dateShortDayMonthYear"
            :label="$t('dispute.creation.date')"
            disabled
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            :value="installationDate | dateShortDayMonthYear"
            :label="$t('dispute.installation.date')"
            disabled
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            :value="installationAge"
            disabled
            :label="$t('disputes.age.after.installation')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            :value="expectedCommission"
            :label="$t('dispute.expected.comission')"
            disabled
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            :value="receivedCommission"
            disabled
            :label="$t('disputes.recieved.comisson')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            :value="difference"
            :label="$t('disputes.difference')"
            disabled
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md12>
          <v-textarea
            :label="$t('dispute.order.comment')"
            readonly
            :value="orderComment"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import FieldAccountNumber from '@/components/FieldAccountNumber';
import FieldOrderConfirmation from '@/components/FieldOrderConfirmation';
import FieldWoNumber from '@/components/FieldWoNumber';

import { dateShortDayMonthYear } from '@/filters/dateFormat';
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'GeneralInformationFormDispute',
  components: {
    FieldAccountNumber,
    FieldOrderConfirmation,
    FieldWoNumber,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  filters: {
    dateShortDayMonthYear,
  },
  data() {
    return {
      fieldCantBeEmptyRule: [validateFieldCantBeEmpty()],
    };
  },
  computed: {
    affiliateName() {
      return this.value.affiliateName || ' ';
    },
    affiliateId() {
      return this.value.affiliateId || ' ';
    },
    fiscalPeriod() {
      return (this.value.fiscalPeriod || {}).name || ' ';
    },
    creationAge() {
      return this.value.creationAge || ' ';
    },
    installationAge() {
      return this.value.installationAge;
    },
    expectedCommission() {
      return this.value.expectedCommission;
    },
    receivedCommission() {
      return this.value.receivedCommission;
    },
    difference() {
      return this.value.difference;
    },
    createdOn() {
      return this.value.createdOn || ' ';
    },
    installationDate() {
      return this.value.installationDate || '';
    },
    orderComment() {
      return this.value.orderComment || ' ';
    },
    disputeInfo: {
      get() {
        return this.value;
      },
      set(disputeInfo) {
        this.$emit('input', disputeInfo);
      },
    },
  },
  methods: {
    validate() {
      return [
        this.$refs.form.validate(),
        this.$refs.fieldWoNumber.validate(),
        this.$refs.fieldAccountNumber.validate(),
      ].every(isValidForm => isValidForm === true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.general-information-from {
  padding: 0 40px 0 24px;
  border-right: 2px solid $content-background-color;
  border-bottom: 2px solid $content-background-color;
}

.general-information-title {
  font-size: 16px;
  font-weight: bold;
  color: $base-text-color;
  margin-bottom: 20px;
}

.v-input /deep/ {
  .v-input__slot:before {
    display: none;
  }

  .v-input__slot {
    border-bottom: 2px solid $base-grey;
  }
}
</style>
