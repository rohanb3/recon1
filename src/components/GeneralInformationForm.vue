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
          <v-text-field
            class="required"
            required
            v-model="accountNumber"
            :label="$t('dispute.account.number')"
            :rules="fieldCantBeEmptyRule"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            v-model="confirmationId"
            class="required"
            required
            :rules="fieldCantBeEmptyRule"
            :label="$t('dispute.order.confirmation')"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            value
            class="required"
            required
            v-model="woNumber"
            :rules="fieldCantBeEmptyRule"
            :label="$t('dispute.wo.number')"
            :validate-on-blur="true"
          ></v-text-field>
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
            :value="recevedСomission | dollar"
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
import { SHORT_DAY_MONTH_FULL_YEAR } from '@/constants/dateFormats';
import { dollar } from '@/filters/currency';
import moment from 'moment';

export default {
  name: 'GeneralInformationForm',
  components: {
    FieldDateEditor,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  filters: {
    dollar,
  },
  data() {
    return {
      fieldCantBeEmptyRule: [v => !!v || this.$t('field.cant.be.empty')],
    };
  },
  computed: {
    affiliateName() {
      return this.value.affiliateName || ' ';
    },
    affiliateId() {
      return this.value.affiliateId || ' ';
    },
    accountNumber: {
      get() {
        return this.value.accountNumber;
      },
      set(accountNumber) {
        this.$emit('input', { ...this.value, accountNumber });
      },
    },
    confirmationId: {
      get() {
        return this.value.confirmationId;
      },
      set(confirmationId) {
        this.$emit('input', { ...this.value, confirmationId });
      },
    },
    woNumber: {
      get() {
        return this.value.woNumber;
      },
      set(woNumber) {
        this.$emit('input', { ...this.value, woNumber });
      },
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
  },
  methods: {
    prettifyDate(date) {
      if (date === '') return '';
      return moment.utc(date).format(SHORT_DAY_MONTH_FULL_YEAR);
    },
    validate() {
      return this.$refs.form.validate();
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
