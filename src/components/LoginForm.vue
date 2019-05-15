<template>
  <v-layout flex align-center justify-center>
    <v-flex xs12 sm6 lg4 elevation-6 class="login-form-wrapper">
      <div class="login__header">
        <span class="heading">{{ $t('login') }}</span>
      </div>
      <div>
        <div>
          <v-form v-model="valid" ref="form">
            <v-text-field
              label="Email"
              name="email"
              ref="emailInput"
              v-model="email"
              autofocus
              required
              :rules="emailRules"
              :validate-on-blur="true"
            ></v-text-field>
            <v-text-field
              label="Password"
              class="password-input"
              name="password"
              ref="passwordInput"
              browser-autocomplete="new-password"
              v-model="password"
              required
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :type="e1 ? 'password' : 'text'"
              hide-details
              @click:append="() => (e1 = !e1)"
            ></v-text-field>

            <div class="forgot-link-wrapper">
              <router-link class="forgot-link" :to="{ name: 'password-recovery' }">
                {{ $t('login.forgot') }}
              </router-link>
            </div>

            <div class="agreement">
              <v-checkbox
                class="checkbox-input"
                v-model="agreement"
                :hide-details="true"
              ></v-checkbox>
              <div>
                <span>{{ $t('i.agree.to.the') }}</span>
                <a class="link" target="_blank" :href="linkPrivacyPolicy">{{
                  $t('terms.and.conditions')
                }}</a>
              </div>
            </div>
            <v-btn @click="onSubmit" class="button" :disabled="!valid || !agreement">{{
              $t('login')
            }}</v-btn>
          </v-form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  validateFieldCantBeEmpty,
  validateEmail,
  validateMaxTextLength,
} from '@/services/validators';

const LINK_PRIVACY_POLICY = 'https://xyzreviews.com/privacy-policy/';

const MAX_EMAIL_LENGTH = 50;

export default {
  name: 'LoginForm',
  data() {
    return {
      valid: false,
      agreement: false,
      password: '',
      email: '',
      e1: true,
      linkPrivacyPolicy: LINK_PRIVACY_POLICY,
      emailRules: [
        validateFieldCantBeEmpty('email.is.required'),
        validateMaxTextLength(MAX_EMAIL_LENGTH, 'email.should.not.be.longer.than.50.symbols'),
        validateEmail(),
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate() && this.agreement) {
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
  .password-input {
    margin-bottom: 6px;
  }
  .forgot-link-wrapper {
    text-align: right;
    margin-bottom: 30px;
    font-size: 12px;

    .forgot-link {
      text-decoration: none;
    }
  }
  .agreement {
    margin-bottom: 23px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .v-input--selection-controls {
      margin-top: 0px;
      padding-top: 0;
      flex: 0 0 auto;
    }
  }
  .link {
    text-decoration: underline;
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