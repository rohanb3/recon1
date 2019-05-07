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
          <field-date-editor boundaries-selector=".disput-creation-date" v-model="createdOn">
            <v-text-field
              class="disput-creation-date date-field"
              :value="prettifyDate(this.createdOn)"
              :rules="fieldCantBeEmptyRule"
              :label="$t('dispute.creation.date')"
              readonly
            ></v-text-field>
          </field-date-editor>
        </v-flex>
        <v-flex md6 ml-5>
          <field-date-editor
            boundaries-selector=".disput-installation-date"
            v-model="installationDate"
          >
            <v-text-field
              class="disput-installation-date date-field required"
              required
              :value="prettifyDate(this.installationDate)"
              :label="$t('dispute.installation.date')"
              :rules="fieldCantBeEmptyRule"
              readonly
            ></v-text-field>
          </field-date-editor>
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
import FieldDateEditor from '@/components/FieldDateEditor';
import FieldAccountNumber from '@/components/FieldAccountNumber';
import FieldOrderConfirmation from '@/components/FieldOrderConfirmation';
import FieldWoNumber from '@/components/FieldWoNumber';

import { SHORT_DAY_MONTH_FULL_YEAR } from '@/constants/dateFormats';
import currency from '@/filters/currency';
import moment from 'moment';
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'GeneralInformationForm',
  components: {
    FieldDateEditor,
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
    createdOn: {
      get() {
        return this.value.createdOn || '';
      },
      set(createdOn) {
        this.$emit('input', { ...this.value, createdOn });
      },
    },
    installationDate: {
      get() {
        return this.value.installationDate || '';
      },
      set(installationDate) {
        this.$emit('input', { ...this.value, installationDate });
      },
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
    prettifyDate(date) {
      if (date === '') return '';
      return moment.utc(date).format(SHORT_DAY_MONTH_FULL_YEAR);
    },
    validate() {
      return [
        this.$refs.form.validate(),
        this.$refs.fieldWoNumber.validate(),
        this.$refs.fieldOrderConfirmation.validate(),
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
