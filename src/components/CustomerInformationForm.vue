<template>
  <div class="customer-information-form">
    <div class="customer-information-title">{{ $t('dispute.customer.information') }}</div>
    <v-form ref="form">
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            v-model="customerName"
            class="required"
            required
            :label="$t('dispute.customer.name')"
            :rules="customerNameRules"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            v-model="customerPhone"
            class="required"
            :label="$t('dispute.customer.phone')"
            :rules="customerPhoneRules"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <v-text-field
            v-model="city"
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
            v-model="state"
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
            v-model="customerAddress"
            class="required"
            :label="$t('dispute.customer.address')"
            required
            :rules="addressRules"
            :validate-on-blur="true"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            v-model="zipCode"
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
            v-model="orderedUnits"
            disabled
            :label="$t('dispute.ordered.units')"
          ></v-text-field>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            v-model="instalationUnits"
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
            item-value="id"
            item-text="name"
            v-model="service"
            :items="serviceList"
            :rules="serviceNameRules"
            :validate-on-blur="true"
          ></v-select>
        </v-flex>
        <v-flex md6 ml-5>
          <v-text-field
            v-model="legacyCompany"
            disabled
            :label="$t('dispute.legacy.company')"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import {
  validateFieldCantBeEmpty,
  validateMaxTextLength,
  validateTextOnlyLettersAndSpaces,
  validateOnlyDigits,
} from '@/services/validators';

const CUSTOMER_NAME_MAX_LENGTH = 50;
const CUSTOMER_PHONE_MAX_LENGTH = 20;
const CUSTOMER_ADDRESS_MAX_LENGTH = 80;
const CITY_MAX_LENGTH = 50;
const STATE_MAX_LENGTH = 50;
const CUSTOMER_ZIP_MAX_LENGTH = 15;

export default {
  name: 'CustomerInformationForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
    serviceList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      customerNameRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(CUSTOMER_NAME_MAX_LENGTH),
        validateTextOnlyLettersAndSpaces(),
      ],
      customerPhoneRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(CUSTOMER_PHONE_MAX_LENGTH),
        validateOnlyDigits(),
      ],
      cityRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(CITY_MAX_LENGTH),
        validateTextOnlyLettersAndSpaces(),
      ],
      stateRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(STATE_MAX_LENGTH),
        validateTextOnlyLettersAndSpaces(),
      ],
      addressRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(CUSTOMER_ADDRESS_MAX_LENGTH),
      ],
      zipRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(CUSTOMER_ZIP_MAX_LENGTH),
        validateOnlyDigits(),
      ],
      serviceNameRules: [validateFieldCantBeEmpty()],
      legacyCompanyRules: [validateFieldCantBeEmpty()],
    };
  },
  computed: {
    customerName: {
      get() {
        return this.value.customerName;
      },
      set(customerName) {
        this.$emit('input', { ...this.value, customerName });
      },
    },
    customerPhone: {
      get() {
        return this.value.customerPhone;
      },
      set(customerPhone) {
        this.$emit('input', { ...this.value, customerPhone });
      },
    },
    city: {
      get() {
        return this.value.city;
      },
      set(city) {
        this.$emit('input', { ...this.value, city });
      },
    },
    state: {
      get() {
        return this.value.state;
      },
      set(state) {
        this.$emit('input', { ...this.value, state });
      },
    },
    customerAddress: {
      get() {
        return this.value.customerAddress;
      },
      set(customerAddress) {
        this.$emit('input', { ...this.value, customerAddress });
      },
    },
    zipCode: {
      get() {
        return this.value.zipCode;
      },
      set(zipCode) {
        this.$emit('input', { ...this.value, zipCode });
      },
    },
    orderedUnits() {
      return this.value.orderedUnits || ' ';
    },
    instalationUnits() {
      return this.value.instalationUnits || ' ';
    },
    service: {
      get() {
        return this.value.service || ' ';
      },
      set(service) {
        this.$emit('input', { ...this.value, service });
      },
    },
    legacyCompany() {
      return this.value.legacyCompany || ' ';
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
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
