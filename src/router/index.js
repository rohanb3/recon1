import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Base from '@/views/Base';
import AppContent from '@/views/AppContent';
import OrdersPage from '@/containers/OrdersPage';
import DisputePage from '@/containers/DisputePage';
import DisputesPage from '@/containers/DisputesPage';

import LoginPage from '@/containers/LoginPage';
import PasswordRecoveryPage from '@/containers/PasswordRecoveryPage';
import VerificationCodePage from '@/containers/VerificationCodePage';
import ResetPasswordPage from '@/containers/ResetPasswordPage';

import { ROUTE_NAMES } from '@/constants';

import AppHeader from '@/containers/AppHeader';
import LHS from '@/containers/LHS';

import identityApi from '@/services/identityApi';
import disputesApi from '@/services/disputesApi';
import applyAuthInterceptors from '@/services/authInterceptors';

Vue.use(Router);

function authGuard(to, from, next) {
  if (store.state.loggedInUser.token) {
    next();
  } else {
    next({ name: ROUTE_NAMES.LOGIN });
  }
}

function loginGuard(to, from, next) {
  if (store.state.loggedInUser.token) {
    next({ path: 'admin' });
  } else {
    next();
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: ROUTE_NAMES.LOGIN,
      component: LoginPage,
      beforeEnter: loginGuard,
    },
    {
      path: '/password-recovery',
      name: ROUTE_NAMES.PASSWORD_RECOVERY,
      component: PasswordRecoveryPage,
      beforeEnter: loginGuard,
    },
    {
      path: '/verification-code',
      name: ROUTE_NAMES.VERIFICATION_CODE,
      component: VerificationCodePage,
      beforeEnter: loginGuard,
    },
    {
      path: '/reset-password',
      name: ROUTE_NAMES.RESET_PASSWORD,
      component: ResetPasswordPage,
      beforeEnter: loginGuard,
    },
    {
      path: '/',
      name: ROUTE_NAMES.MAIN_PAGE,
      redirect: { name: ROUTE_NAMES.SELECT_ORDER },
      component: Base,
      beforeEnter: authGuard,
      children: [
        {
          path: '',
          redirect: 'select-order',
          components: {
            header: AppHeader,
            lhs: LHS,
            main: AppContent,
          },
          children: [
            {
              path: 'select-order',
              component: OrdersPage,
              name: ROUTE_NAMES.SELECT_ORDER,
            },
            {
              path: 'edit-dispute/:disputeId',
              component: DisputePage,
              name: ROUTE_NAMES.EDIT_DISPUTE,
            },
            {
              path: 'creat-dispute/:orderId',
              component: DisputePage,
              name: ROUTE_NAMES.CREAT_DISPUTE,
            },
            {
              path: 'dispute-list',
              component: DisputesPage,
              name: ROUTE_NAMES.DISPUTE_LIST,
            },
            {
              path: 'resubmission-table',
              component: DisputesPage,
              name: ROUTE_NAMES.RESUBMISSION_TABLE,
            },
          ],
        },
      ],
    },
  ],
});

applyAuthInterceptors(identityApi, router);
applyAuthInterceptors(disputesApi, router);

export default router;
