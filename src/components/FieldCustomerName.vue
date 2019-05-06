<template>
  <v-form ref="form">
    <v-text-field
      v-model="customerName"
      class="required"
      required
      :label="$t('dispute.customer.name')"
      :rules="customerNameRules"
      :validate-on-blur="true"
    ></v-text-field>
  </v-form>
</template>

<script>
import {
  validateFieldCantBeEmpty,
  validateMaxTextLength,
  validateTextOnlyLettersAndDelimiters,
} from '@/services/validators';

const CUSTOMER_NAME_MAX_LENGTH = 50;

export default {
  name: 'FieldCustomerName',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      customerNameRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(CUSTOMER_NAME_MAX_LENGTH),
        validateTextOnlyLettersAndDelimiters(),
      ],
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
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>
