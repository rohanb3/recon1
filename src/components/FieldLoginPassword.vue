<template>
  <v-text-field
    :label="$t('password')"
    class="password-input"
    name="password"
    browser-autocomplete="new-password"
    v-model="password"
    required
    ref="fieldLoginPassword"
    :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
    :type="isShowPassword ? 'password' : 'text'"
    :rules="passwordRules"
    @input="validate"
    @click:append="() => (isShowPassword = !isShowPassword)"
  ></v-text-field>
</template>

<script>
import { validateFieldCantBeEmpty } from '@/services/validators';

export default {
  name: 'FieldLoginPassword',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isShowPassword: true,
      passwordRules: [validateFieldCantBeEmpty('password.is.required')],
    };
  },
  computed: {
    password: {
      get() {
        return this.value;
      },
      set(password) {
        this.$emit('input', password);
      },
    },
  },
  methods: {
    validate() {
      const status = this.$refs.fieldLoginPassword.validate();
      this.$emit('valid', status);
      return status;
    },
  },
};
</script>

<style lang="scss" scoped>
.password-input {
  margin-bottom: 6px;
}
</style>
