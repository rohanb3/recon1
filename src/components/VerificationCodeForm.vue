<template>
  <v-layout flex align-center justify-center>
    <v-flex xs12 sm4 elevation-6 class="login-form-wrapper" pa-0>
      <div class="login__header pa-3">
        <span class="heading">{{ $t('verification.code') }}</span>
        <div class="description">{{ $t('we.sended.verification.code') }}</div>
      </div>
      <div>
        <div>
          <v-form v-model="valid" ref="form">
            <div class="code-wrapper">
              <field-entered-code
                v-model="code1"
                ref="code1"
                autofocus
                @input="enteredCode => onInputCode(enteredCode, 2, 1)"
              />
              <field-entered-code
                v-model="code2"
                ref="code2"
                @input="enteredCode => onInputCode(enteredCode, 3, 1)"
              />
              <field-entered-code
                v-model="code3"
                ref="code3"
                @input="enteredCode => onInputCode(enteredCode, 4, 2)"
              />
              <field-entered-code
                v-model="code4"
                ref="code4"
                @input="enteredCode => onInputCode(enteredCode, 4, 3)"
              />
            </div>
            <v-container fluid>
              <v-layout row mt-4 align-center justify-space-around>
                <v-flex order-lg2>
                  <a class="back-to-login" href="#" @click.prevent="$emit('resendCode')">{{
                    $t('resend.code')
                  }}</a>
                </v-flex>
                <v-flex order-lg2>
                  <v-btn
                    class="button"
                    @click="$emit('sendVerificationCode', code)"
                    :disabled="!valid"
                    >{{ $t('login.submit') }}</v-btn
                  >
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
import FieldEnteredCode from '@/components/FieldEnteredCode';

export default {
  name: 'VerificationCodeForm',
  components: {
    FieldEnteredCode,
  },
  data() {
    return {
      email: '',
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      valid: false,
    };
  },
  computed: {
    code() {
      return (
        String(this.code1 || '') +
        String(this.code2 || '') +
        String(this.code3 || '') +
        String(this.code4 || '')
      );
    },
  },
  methods: {
    onInputCode(enteredCode, numberNextField, numberPrevField) {
      if (!numberNextField) return;

      if (String(enteredCode).length === 1) {
        this.$refs[`code${numberNextField}`].focus();
      }

      if (String(enteredCode).length === 0) {
        this.$refs[`code${numberPrevField}`].focus();
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

  .code-wrapper {
    display: flex;

    .entered-code /deep/ {
      width: 61px;
      margin: 0 10px;
      font-size: 28px;
      input {
        text-align: center;
      }
    }
  }

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
