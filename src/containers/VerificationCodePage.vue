<template>
  <v-container fluid fill-height>
    <verification-code-form
      @sendVerificationCode="onSendVerificationCode"
      @resendCode="onResendCode"
    />
  </v-container>
</template>

<script>
import VerificationCodeForm from '@/components/VerificationCodeForm';
import { GET_RESET_TOKEN } from '@/store/loggedInUser/actionTypes';
import { requestVerificationCode } from '@/services/identityRepository';
import { errorMessage, successMessage } from '@/services/notifications';
import { ROUTE_NAMES } from '@/constants';

export default {
  name: 'VerificationCodePage',
  components: {
    VerificationCodeForm,
  },
  methods: {
    async onSendVerificationCode(code) {
      try {
        const userEmail = this.$store.state.loggedInUser.email;
        await this.$store.dispatch(GET_RESET_TOKEN, {
          email: userEmail,
          code,
        });
        this.$router.push({ name: ROUTE_NAMES.RESET_PASSWORD });
      } catch {
        errorMessage('invalid.code.entered');
      }
    },
    async onResendCode() {
      try {
        const userEmail = this.$store.state.loggedInUser.email;
        await requestVerificationCode(userEmail);
        successMessage('we.sended.verification.code.again');
      } catch {
        errorMessage();
      }
    },
  },
};
</script>
