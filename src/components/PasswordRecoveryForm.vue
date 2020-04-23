<template>
  <v-layout flex align-center justify-center>
    <v-flex xs12 sm4 elevation-6 class="login-form-wrapper" pa-0>
      <div class="login__header pa-3">
        <span class="heading">{{ $t('password.recovery') }}</span>
      </div>
      <div>
        <div>
          <v-form>
            <div class="pa-3">
              <field-email v-model="email" @valid="isValid => (validEmail = isValid)" />
            </div>
            <v-container fluid>
              <v-layout row mt-5 align-center justify-space-around>
                <v-flex order-lg2>
                  <router-link class="back-to-login" :to="{ name: 'login' }">{{
                    $t('back.to.login')
                  }}</router-link>
                </v-flex>
                <v-flex order-lg2>
                  <v-btn class="button" :disabled="!validEmail" @click="sendVerificationCode">
                    {{ $t('send.me.code') }}
                  </v-btn>
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
import FieldEmail from '@/components/FieldEmail';

export default {
  name: 'PasswordRecoveryForm',
  components: {
    FieldEmail,
  },
  data() {
    return {
      validEmail: false,
      email: '',
    };
  },
  methods: {
    sendVerificationCode() {
      if (this.validEmail) {
        this.$emit('verificationCode', this.email);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.login-form-wrapper {
  padding: 21px 20px 27px;
  max-width: 300px;
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

  .back-to-login {
    text-decoration: none;
    font-size: 16px;
  }

  .button {
    width: 100%;
    border-radius: 4px;
    background-color: $base-blue !important;
    font-size: 16px;
    color: $base-white;
    text-align: center;
    margin: 0;
    box-shadow: none;
    text-transform: initial;
    font-weight: 550;
  }
}
</style>
