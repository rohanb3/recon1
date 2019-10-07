<template>
  <v-text-field
    :label="$t('email')"
    name="email"
    v-model.trim="email"
    autofocus
    required
    ref="fieldEmail"
    :rules="emailRules"
    :validate-on-blur="true"
    @keydown.space.prevent
  ></v-text-field>
</template>

<script>
import {
  validateFieldCantBeEmpty,
  validateMaxTextLength,
  validateEmail,
} from '@/services/validators';

const MAX_EMAIL_LENGTH = 50;

export default {
  name: 'FieldEmail',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      emailRules: [
        validateFieldCantBeEmpty('email.is.required'),
        validateMaxTextLength(MAX_EMAIL_LENGTH, 'email.should.not.be.longer.than.50.symbols'),
        validateEmail(),
      ],
    };
  },
  computed: {
    email: {
      get() {
        return this.value;
      },
      set(email) {
        this.$emit('input', email);
      },
    },
  },
  methods: {
    validate() {
      const status = this.$refs.fieldEmail.validate();
      this.$emit('valid', status);
      return status;
    },
  },
  watch: {
    email() {
      this.$nextTick(() => this.validate());
    },
  },
};
</script>
