<template>
  <v-text-field
    class="entered-code"
    v-model="code"
    :autofocus="autofocus"
    required
    :rules="codeRules"
    :validate-on-blur="true"
    ref="inputCode"
    maxlength="1"
    @input="validate"
  ></v-text-field>
</template>

<script>
import { validateOnlyDigits, validateTextShouldBeLength } from '@/services/validators';

const CODE_LENGTH = 1;

export default {
  name: 'FieldEnteredCode',
  props: {
    value: {
      type: String,
      required: true,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      codeRules: [
        validateOnlyDigits('code.must.be'),
        validateTextShouldBeLength(CODE_LENGTH, 'code.must.be'),
      ],
    };
  },
  computed: {
    code: {
      get() {
        return this.value;
      },
      set(code) {
        this.$emit('input', code);
      },
    },
  },
  methods: {
    validate() {
      this.$refs.inputCode.validate();
    },
    focus() {
      this.$refs.inputCode.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.password-input {
  margin-bottom: 6px;
}
</style>
