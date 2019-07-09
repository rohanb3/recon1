<template>
  <v-container fluid fill-height>
    <password-recovery-form :loading="loading" @verificationCode="sendVerificationCode" />
  </v-container>
</template>

<script>
import PasswordRecoveryForm from '@/components/PasswordRecoveryForm';
import { requestVerificationCode } from '@/services/identityRepository';
import { SET_EMAIL } from '@/store/loggedInUser/mutationTypes';
import { ROUTE_NAMES } from '@/constants';
import { errorMessage } from '@/services/notifications';

export default {
  name: 'PasswordRecoveryPage',
  components: {
    PasswordRecoveryForm,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async sendVerificationCode(email) {
      this.loading = true;
      try {
        const emailLowerCase = email.toLowerCase();
        await requestVerificationCode(emailLowerCase);
        this.$store.commit(SET_EMAIL, emailLowerCase);
        this.$router.push({ name: ROUTE_NAMES.VERIFICATION_CODE });
      } catch (e) {
        const {
          response: {
            data: { errors: message },
          },
        } = e;

        if (message.Email) {
          errorMessage('email.is.not.registered');
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
