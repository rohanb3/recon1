<template>
  <v-form ref="form">
    <v-text-field
      v-model="confirmationId"
      class="required"
      required
      :rules="fieldCantBeEmptyRule"
      :label="$t('dispute.order.confirmation')"
      :validate-on-blur="true"
    ></v-text-field>
  </v-form>
</template>

<script>
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'FieldOrderConfirmation',
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
    confirmationId: {
      get() {
        return this.value.confirmationId;
      },
      set(confirmationId) {
        this.$emit('input', { ...this.value, confirmationId });
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
