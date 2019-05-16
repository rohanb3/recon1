<template>
  <v-text-field
    :label="label"
    class="password-input"
    name="password"
    browser-autocomplete="new-password"
    v-model="password"
    required
    ref="fieldPassword"
    :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
    :type="isShowPassword ? 'password' : 'text'"
    :rules="rules"
    @input="validate"
    @update:error="validate"
    @click:append="() => (isShowPassword = !isShowPassword)"
  ></v-text-field>
</template>

<script>
import { validateFieldCantBeEmpty } from '@/services/validators';
import i18n from '@/i18n';

export default {
  name: 'FieldPassword',
  props: {
    value: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      default() {
        return [validateFieldCantBeEmpty('password.is.required')];
      },
    },
    label: {
      type: String,
      default: i18n.t('password'),
    },
  },
  data() {
    return {
      isShowPassword: true,
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
      const status = this.$refs.fieldPassword.validate();
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
