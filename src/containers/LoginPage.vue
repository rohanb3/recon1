<template>
  <v-container fluid fill-height class="login-page">
    <login-form @login="onLogin" :loading="loading" />
  </v-container>
</template>

<script>
import { LOGIN } from '@/store/loggedInUser/actionTypes';
import LoginForm from '@/components/LoginForm';
import { errorMessage } from '@/services/notifications';
import { ROUTE_NAMES, RESPONSE_STATUSES } from '@/constants';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onLogin({ email, password }) {
      this.loading = true;
      try {
        await this.$store.dispatch(LOGIN, { email, password });
        this.$router.push({ name: ROUTE_NAMES.SELECT_ORDER });
      } catch (e) {
        const {
          response: {
            status,
            data: { errors: message },
          },
        } = e;

        if (status === RESPONSE_STATUSES.FORBIDDEN) {
          errorMessage('login.failed', 'email.is.not.registered');
        } else {
          errorMessage('login.failed', this.getDescriptionReason(message));
        }
      } finally {
        this.loading = false;
      }
    },
    getDescriptionReason(message) {
      if (message.Email) {
        return 'email.is.not.registered';
      }

      if (message.Password) {
        return 'password.or.email.is.incorrect';
      }

      return 'something.went.wrong';
    },
  },
};
</script>
