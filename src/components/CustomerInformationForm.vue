<template>
  <div class="customer-information-form">
    <div class="customer-information-title">{{ $t('dispute.customer.information') }}</div>
    <v-form>
      <v-layout row mb-2>
        <v-flex md6>
          <field-customer-name ref="fieldCustomerName" v-model="disputeInfo" />
        </v-flex>
        <v-flex md6 ml-5>
          <field-customer-phone ref="fieldCustomerPhone" v-model="disputeInfo" />
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <field-city ref="fieldCity" v-model="disputeInfo" />
        </v-flex>
        <v-flex md6 ml-5>
          <field-state ref="fieldState" v-model="disputeInfo" />
        </v-flex>
      </v-layout>
      <v-layout row mb-2>
        <v-flex md6>
          <field-customer-address ref="fieldCustomerAddress" v-model="disputeInfo" />
        </v-flex>
        <v-flex md6 ml-5>
          <field-zip-code ref="fieldZipCode" v-model="disputeInfo" />
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
          <select-service-name
            ref="selectServiceName"
            v-model="disputeInfo"
            :service-list="serviceList"
          />
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
import SelectServiceName from '@/components/SelectServiceName';
import FieldCustomerName from '@/components/FieldCustomerName';
import FieldCustomerPhone from '@/components/FieldCustomerPhone';
import FieldCity from '@/components/FieldCity';
import FieldState from '@/components/FieldState';
import FieldCustomerAddress from '@/components/FieldCustomerAddress';
import FieldZipCode from '@/components/FieldZipCode';

export default {
  name: 'CustomerInformationForm',
  components: {
    SelectServiceName,
    FieldCustomerName,
    FieldCustomerPhone,
    FieldCity,
    FieldState,
    FieldCustomerAddress,
    FieldZipCode,
  },
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
  computed: {
    orderedUnits() {
      return this.value.orderedUnits || ' ';
    },
    instalationUnits() {
      return this.value.instalationUnits || ' ';
    },
    legacyCompany() {
      return this.value.legacyCompany || ' ';
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
        this.$refs.selectServiceName.validate(),
        this.$refs.fieldCity.validate(),
        this.$refs.fieldCustomerPhone.validate(),
        this.$refs.fieldCustomerName.validate(),
        this.$refs.fieldState.validate(),
        this.$refs.fieldCustomerAddress.validate(),
        this.$refs.fieldZipCode.validate(),
      ].every(isValidForm => isValidForm === true);
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
