<template>
  <v-text-field v-model="confirmationId" :label="$t('dispute.order.confirmation')"></v-text-field>
</template>

<script>
export default {
  name: 'FieldOrderConfirmation',
  props: {
    value: {
      type: Object,
      required: true,
    },
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
};
</script>
