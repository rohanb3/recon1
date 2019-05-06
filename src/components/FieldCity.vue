<template>
  <v-form ref="form">
    <v-text-field
      v-model="city"
      :label="$t('dispute.city')"
      required
      class="required"
      :rules="cityRules"
      :validate-on-blur="true"
    ></v-text-field>
  </v-form>
</template>

<script>
import {
  validateFieldCantBeEmpty,
  validateMaxTextLength,
  validateTextOnlyLettersAndSpaces,
} from '@/services/validators';

const CITY_MAX_LENGTH = 20;

export default {
  name: 'FieldCity',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cityRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(CITY_MAX_LENGTH),
        validateTextOnlyLettersAndSpaces(),
      ],
    };
  },
  computed: {
    city: {
      get() {
        return this.value.city;
      },
      set(city) {
        this.$emit('input', { ...this.value, city });
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
