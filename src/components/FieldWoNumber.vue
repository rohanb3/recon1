<template>
  <v-form ref="form">
    <v-text-field value v-model="woNumber" :label="$t('dispute.wo.number')"></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: 'FieldWoNumber',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    woNumber: {
      get() {
        return this.value.woNumber;
      },
      set(woNumber) {
        this.$emit('input', { ...this.value, woNumber });
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
