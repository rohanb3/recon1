<template>
  <v-form ref="form">
    <v-text-field
      v-model="customerAddress"
      class="required"
      :label="$t('dispute.customer.address')"
      required
      :rules="addressRules"
      :validate-on-blur="true"
    ></v-text-field>
  </v-form>
</template>

<script>
import { validateFieldCantBeEmpty, validateMaxTextLength } from '@/services/validators';

const CUSTOMER_ADDRESS_MAX_LENGTH = 80;

export default {
  name: 'FieldCustomerAddress',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      addressRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(CUSTOMER_ADDRESS_MAX_LENGTH),
      ],
    };
  },
  computed: {
    customerAddress: {
      get() {
        return this.value.customerAddress;
      },
      set(customerAddress) {
        this.$emit('input', { ...this.value, customerAddress });
      },
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>
