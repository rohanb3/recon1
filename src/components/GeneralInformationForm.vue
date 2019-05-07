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
          <FieldOrderConfirmation ref="fieldOrderConfirmation" v-model="disputeInfo" />
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
          <field-disput-creation-date ref="fieldDisputCreationDate" v-model="disputeInfo" />
        </v-flex>
        <v-flex md6 ml-5>
          <field-installation-date ref="fieldInstallationDate" v-model="disputeInfo" />
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            :value="creationAge"
            disabled
            :label="$t('dispute.age.by.creation.date')"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            :value="installationAge"
            disabled
            :label="$t('dispute.age.by.instalation.date')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            :value="expectedComission"
            disabled
            :label="$t('dispute.expected.comission')"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            :value="recevedСomission | currency"
            disabled
            :label="$t('dispute.recived.comission.difference')"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import FieldAccountNumber from '@/components/FieldAccountNumber';
import FieldOrderConfirmation from '@/components/FieldOrderConfirmation';
import FieldWoNumber from '@/components/FieldWoNumber';
import FieldDisputCreationDate from '@/components/FieldDisputCreationDate';
import FieldInstallationDate from '@/components/FieldInstallationDate';

import currency from '@/filters/currency';
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'GeneralInformationForm',
  components: {
    FieldAccountNumber,
    FieldOrderConfirmation,
    FieldWoNumber,
    FieldDisputCreationDate,
    FieldInstallationDate,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  filters: {
    currency,
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
      return this.value.installationAge || ' ';
    },
    expectedComission() {
      return this.value.expectedComission || ' ';
    },
    recevedСomission() {
      return this.value.recevedСomission || ' ';
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
        this.$refs.fieldOrderConfirmation.validate(),
        this.$refs.fieldAccountNumber.validate(),
        this.$refs.fieldDisputCreationDate.validate(),
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
