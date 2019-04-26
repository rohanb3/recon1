<template>
  <div class="customer-information-form">
    <div class="customer-information-title">{{ $t('dispute.customer.information') }}</div>
    <v-form @input="isValid => $emit('input', isValid)">
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            value="465"
            class="required"
            required
            :label="$t('dispute.customer.name')"
            :rules="customerNameRules"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            value="132"
            class="required"
            :label="$t('dispute.customer.phone')"
            :rules="customerPhone"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            value="84483000000354"
            :label="$t('dispute.city')"
            required
            class="required"
            :rules="cityRules"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            class="required"
            value="#8899"
            :label="$t('dispute.state')"
            required
            :rules="stateRules"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            value="465"
            class="required"
            :label="$t('dispute.customer.address')"
            required
            :rules="addressRules"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            value="132"
            class="required"
            :label="$t('dispute.zip')"
            required
            :rules="zipRules"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            value="84483000000354"
            disabled
            :label="$t('dispute.ordered.units')"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            value="#8899"
            disabled
            :label="$t('dispute.installed.units')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-select
            append-icon="expand_more"
            :label="$t('dispute.service.name')"
            required
            class="required"
            :items="legacyCompany"
            :rules="serviceNameRules"
            :validate-on-blur="true"
          ></v-select>
        </v-flex>
        <v-flex md6 ml-5>
          <v-select
            append-icon="expand_more"
            class="required"
            :label="$t('dispute.legacy.company')"
            required
            :items="legacyCompany"
            :rules="legacyCompanyRules"
            :validate-on-blur="true"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
const CUSTOMER_NAME_MAX_LENGTH = 50;
const CUSTOMER_PHONE_MAX_LENGTH = 20;
const CUSTOMER_ADDRESS_MAX_LENGTH = 80;
const CITY_MAX_LENGTH = 50;
const STATE_MAX_LENGTH = 50;
const CUSTOMER_ZIP_MAX_LENGTH = 15;
const ONLY_LETTERS_AND_SPACES_REGEX = /^[a-zA-Z ]+$/;
const ONLY_DIGITS_REGEX = /^[\d]+$/;

export default {
  name: 'CustomerInformationForm',
  data() {
    return {
      legacyCompany: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      customerNameRules: [
        v => !!v || this.$t('field.cant.be.empty'),
        v =>
          v.length <= CUSTOMER_NAME_MAX_LENGTH ||
          this.$t('field.max.length', {
            length: CUSTOMER_NAME_MAX_LENGTH,
          }),
        v => ONLY_LETTERS_AND_SPACES_REGEX.test(v) || this.$t('field.must.consist.only.letters'),
      ],
      customerPhone: [
        v => !!v || this.$t('field.cant.be.empty'),
        v =>
          v.length <= CUSTOMER_PHONE_MAX_LENGTH ||
          this.$t('field.max.length', {
            length: CUSTOMER_PHONE_MAX_LENGTH,
          }),
        v => ONLY_DIGITS_REGEX.test(v) || this.$t('field.must.consist.only.digits'),
      ],
      cityRules: [
        v => !!v || this.$t('field.cant.be.empty'),
        v =>
          v.length <= CITY_MAX_LENGTH ||
          this.$t('field.max.length', {
            length: CITY_MAX_LENGTH,
          }),
        v => ONLY_LETTERS_AND_SPACES_REGEX.test(v) || this.$t('field.must.consist.only.letters'),
      ],
      stateRules: [
        v => !!v || this.$t('field.cant.be.empty'),
        v =>
          v.length <= STATE_MAX_LENGTH ||
          this.$t('field.max.length', {
            length: STATE_MAX_LENGTH,
          }),
        v => ONLY_LETTERS_AND_SPACES_REGEX.test(v) || this.$t('field.must.consist.only.letters'),
      ],
      addressRules: [
        v => !!v || this.$t('field.cant.be.empty'),
        v =>
          v.length <= CUSTOMER_ADDRESS_MAX_LENGTH ||
          this.$t('field.max.length', {
            length: CUSTOMER_ADDRESS_MAX_LENGTH,
          }),
      ],
      zipRules: [
        v => !!v || this.$t('field.cant.be.empty'),
        v =>
          v.length <= CUSTOMER_ZIP_MAX_LENGTH ||
          this.$t('field.max.length', {
            length: CUSTOMER_ZIP_MAX_LENGTH,
          }),
        v => ONLY_DIGITS_REGEX.test(v) || this.$t('field.must.consist.only.digits'),
      ],
      serviceNameRules: [v => !!v || this.$t('field.cant.be.empty')],
      legacyCompanyRules: [v => !!v || this.$t('field.cant.be.empty')],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.customer-information-form {
  margin: 0 35px;
}

.customer-information-title {
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
