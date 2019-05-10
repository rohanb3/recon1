<template>
  <v-form ref="form">
    <v-text-field
      class="required"
      v-model="state"
      :label="$t('dispute.state')"
      required
      :rules="stateRules"
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

const STATE_MAX_LENGTH = 50;

export default {
  name: 'FieldState',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      stateRules: [
        validateFieldCantBeEmpty(),
        validateMaxTextLength(STATE_MAX_LENGTH),
        validateTextOnlyLettersAndDelimiters(),
      ],
    };
  },
  computed: {
    state: {
      get() {
        return this.value.state;
      },
      set(state) {
        this.$emit('input', { ...this.value, state });
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
