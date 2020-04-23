<template>
  <v-container fluid fill-height>
    <password-recovery-form @verificationCode="sendVerificationCode" />
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
  methods: {
    async sendVerificationCode(email) {
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
      }
    },
  },
};
</script>
