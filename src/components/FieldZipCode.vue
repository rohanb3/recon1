<template>
  <v-form ref="form">
    <v-text-field
      v-model="zipCode"
      class="required"
      :label="$t('dispute.zip')"
      required
      :rules="zipRules"
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

const CUSTOMER_ZIP_MAX_LENGTH = 15;

export default {
  name: 'FieldZipCode',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      zipRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(CUSTOMER_ZIP_MAX_LENGTH),
        validateOnlyDigits(),
      ],
    };
  },
  computed: {
    zipCode: {
      get() {
        return this.value.zipCode;
      },
      set(zipCode) {
        this.$emit('input', { ...this.value, zipCode });
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
