<template>
  <v-form ref="form">
    <v-text-field
      v-model="customerPhone"
      class="required"
      :label="$t('dispute.customer.phone')"
      :rules="customerPhoneRules"
      :validate-on-blur="true"
    ></v-text-field>
  </v-form>
</template>

<script>
import {
  validateFieldCantBeEmpty,
  validateMaxTextLength,
  validateOnlyDigits,
} from '@/services/validators';

const CUSTOMER_PHONE_MAX_LENGTH = 20;

export default {
  name: 'FieldCustomerPhone',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      customerPhoneRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(CUSTOMER_PHONE_MAX_LENGTH),
        validateOnlyDigits(),
      ],
    };
  },
  computed: {
    customerPhone: {
      get() {
        return this.value.customerPhone;
      },
      set(customerPhone) {
        this.$emit('input', { ...this.value, customerPhone });
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
