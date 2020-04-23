<template>
  <v-form ref="form">
    <v-text-field
      value
      class="required"
      required
      v-model="woNumber"
      :rules="fieldCantBeEmptyRule"
      :label="$t('dispute.wo.number')"
      :validate-on-blur="true"
    ></v-text-field>
  </v-form>
</template>

<script>
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'FieldWoNumber',
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
