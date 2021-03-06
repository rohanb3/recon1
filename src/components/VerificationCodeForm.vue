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
            <div class="resend-code-wrapper">
              <a class="resend-link" href="#" @click.prevent="debounceResendCode">{{
                $t('resend.code')
              }}</a>
            </div>
            <v-container fluid>
              <v-layout row mt-4 align-center justify-space-around>
                <v-flex order-lg2>
                  <router-link class="back-to-login" :to="{ name: 'login' }">{{
                    $t('back.to.login')
                  }}</router-link>
                </v-flex>
                <v-flex order-lg2>
                  <custom-button
                    :title="$t('login.submit')"
                    :loading="loading"
                    :disabled="!valid"
                    @click="$emit('sendVerificationCode', code)"
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
import debounce from 'lodash.debounce';
import FieldEnteredCode from '@/components/FieldEnteredCode';
import CustomButton from '@/components/CustomButton';

const RESEND_CODE_TIMEOUT = 500;

export default {
  name: 'VerificationCodeForm',
  components: {
    FieldEnteredCode,
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
      const index = this.indexFieldCode(enteredCode, numberNextField, numberPrevField);
      this.$refs[`code${index}`].focus();
    },
    indexFieldCode(enteredCode, numberNextField, numberPrevField) {
      if (String(enteredCode).length) {
        return numberNextField;
      }
      return numberPrevField;
    },
    debounceResendCode: debounce(function debounceResendCode() {
      this.$emit('resendCode');
    }, RESEND_CODE_TIMEOUT),
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

  .resend-code-wrapper {
    text-align: right;
    margin-bottom: 30px;
    margin-right: 10px;
    font-size: 12px;

    .resend-link {
      text-decoration: none;
    }
  }
}
</style>
