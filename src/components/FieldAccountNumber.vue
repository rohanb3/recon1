<template>
  <v-form ref="form">
    <v-text-field
      class="required"
      required
      v-model="accountNumber"
      :label="$t('dispute.account.number')"
      :rules="fieldCantBeEmptyRule"
      :validate-on-blur="true"
    ></v-text-field>
  </v-form>
</template>

<script>
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'FieldAccountNumber',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fieldCantBeEmptyRule: [validateFieldCantBeEmpty()],
    };
  },
  computed: {
    accountNumber: {
      get() {
        return this.value.accountNumber;
      },
      set(accountNumber) {
        this.$emit('input', { ...this.value, accountNumber });
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
