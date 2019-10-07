<template>
  <v-container fluid fill-height>
    <reset-password-form :loading="loading" @resetPassword="onResetPassword" />
  </v-container>
</template>

<script>
import ResetPasswordForm from '@/components/ResetPasswordForm';
import { resetPassword } from '@/services/identityRepository';
import { errorMessage } from '@/services/notifications';
import { ROUTE_NAMES } from '@/constants';

export default {
  name: 'ResetPasswordPage',
  components: {
    ResetPasswordForm,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onResetPassword(password) {
      this.loading = true;
      try {
        const token = this.$store.state.loggedInUser.resetToken;
        await resetPassword(token, password);
        this.$router.push({ name: ROUTE_NAMES.LOGIN });
      } catch {
        errorMessage();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
