<template>
  <v-layout flex align-center justify-center>
    <v-flex xs12 sm4 elevation-6 pb-0 class="login-form-wrapper">
      <div class="login__header">
        <span class="heading">{{ $t('reset.password') }}</span>
        <div class="description mb-3">{{ $t('enter.your.new.password') }}</div>
      </div>
      <div>
        <div>
          <v-form>
            <field-password
              v-model.trim="password"
              :label="$t('new.password')"
              :rules="passwordRules"
              ref="password"
              @valid="isValid => (validPassword = isValid)"
            />
            <field-password
              v-model.trim="confirmPassword"
              :label="$t('confirm.new.password')"
              :rules="confirmPasswordRules"
              ref="confirmPassword"
            />
            <v-container fluid px-0>
              <v-layout row mt-5 px-0 align-center justify-space-around>
                <v-flex order-lg2>
                  <router-link class="back-to-login" :to="{ name: 'login' }">{{
                    $t('back.to.login')
                  }}</router-link>
                </v-flex>
                <v-flex order-lg2>
                  <custom-button
                    :title="$t('reset.password')"
                    :loading="loading"
                    :disabled="!valid"
                    @click="onSubmit"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import CustomButton from '@/components/CustomButton';
import {
  validateFieldCantBeEmpty,
  validateMinTextLength,
  validateOnlyCapitalLetter,
  validateTextShouldBeEqual,
} from '@/services/validators';

import FieldPassword from '@/components/FieldPassword';

const PASSWORD_LENGTH = 8;

export default {
  name: 'ResetPasswordForm',
  components: {
    FieldPassword,
    CustomButton,
  },
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      validPassword: false,
      password: '',
      confirmPassword: '',
      passwordRules: [
        validateFieldCantBeEmpty('password.is.required'),
        validateMinTextLength(PASSWORD_LENGTH, 'password.must.be.at.least.8.chracters'),
        validateOnlyCapitalLetter('password.must.contain.capital.letter'),
      ],
    };
  },
  computed: {
    valid() {
      return this.validPassword && this.validConfirmPassword;
    },
    confirmPasswordRules() {
      return this.passwordRules.concat(
        validateTextShouldBeEqual(this.password, this.confirmPassword, 'password.do.not.match')
      );
    },
    validConfirmPassword() {
      return this.password === this.confirmPassword;
    },
  },
  methods: {
    onSubmit() {
      if (this.valid) {
        this.$emit('resetPassword', this.password);
      }
    },
  },
  watch: {
    password() {
      if (this.confirmPassword.length) {
        this.$nextTick(() => {
          this.$refs.confirmPassword.validate();
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.login-form-wrapper {
  padding: 21px 20px 27px;
  max-width: 320px;
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

    .description {
      color: $base-text-color;
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

  .back-to-login {
    text-decoration: none;
    font-size: 16px;
  }

  .button {
    padding: 8px 0;
    width: 100%;
    border-radius: 4px;
    text-transform: initial;
    background-color: $base-blue !important;
    font-size: 16px;
    font-weight: 500;
    color: $base-white;
    text-align: center;
    margin: 0;
    box-shadow: none;
  }
}
</style>
