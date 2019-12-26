<template>
  <v-layout flex align-center justify-center>
    <v-flex xs12 sm6 lg4 elevation-6 class="login-form-wrapper">
      <div class="login__header">
        <span class="heading">{{ $t('login') }}</span>
      </div>
      <div>
        <v-form ref="form">
          <field-email v-model="email" @valid="isValid => (validEmail = isValid)" />
          <field-password v-model="password" @valid="isValid => (validPassword = isValid)" />
          <div class="forgot-link-wrapper">
            <router-link class="forgot-link" :to="{ name: 'password-recovery' }">{{
              $t('login.forgot')
            }}</router-link>
          </div>
          <checkbox-login-agreement v-model="agreement" ref="agreementInput" />
          <custom-button
            :title="$t('login')"
            :loading="loading"
            :disabled="!isValidForm"
            @click="onSubmit"
          />
        </v-form>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import FieldEmail from '@/components/FieldEmail';
import FieldPassword from '@/components/FieldPassword';
import CheckboxLoginAgreement from '@/components/CheckboxLoginAgreement';
import CustomButton from '@/components/CustomButton';

export default {
  name: 'LoginForm',
  components: {
    FieldEmail,
    FieldPassword,
    CheckboxLoginAgreement,
    CustomButton,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      agreement: false,
      password: '',
      email: '',
      validEmail: false,
      validPassword: false,
    };
  },
  computed: {
    isValidForm() {
      return this.validEmail && this.validPassword && this.agreement;
    },
  },
  methods: {
    onSubmit() {
      if (this.isValidForm) {
        this.$emit('login', { email: this.email, password: this.password });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.login-form-wrapper {
  padding: 21px 20px 27px;
  width: 320px;
  border-radius: 8px;
  box-shadow: 0 3px 4px 0 $lhs-shadow-color !important;
  background-color: $base-white;
  box-sizing: border-box;

  .login__header {
    .heading {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 500;
      color: $login-header-color;
    }
  }

  .forgot-link-wrapper {
    text-align: right;
    margin-bottom: 30px;
    font-size: 12px;

    .forgot-link {
      text-decoration: none;
    }
  }

  .button {
    padding: 8px 0;
    width: 100%;
    border-radius: 4px;
    background-color: $base-blue !important;
    font-size: 16px;
    font-weight: bold;
    color: $base-white;
    text-align: center;
    margin: 0;
    box-shadow: none;
  }
}
</style>
