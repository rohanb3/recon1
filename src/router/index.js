import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Base from '@/containers/Base';
import AppContent from '@/containers/AppContent';
import OrdersPage from '@/containers/OrdersPage';
import DisputePage from '@/containers/DisputePage';
import DisputesPage from '@/containers/DisputesPage';
import ResubmissionTable from '@/containers/ResubmissionTable';
import SyncNotifier from '@/containers/SyncNotifier';
import DisputesBySubmittersTable from '@/containers/DisputesBySubmittersTable';

import LoginPage from '@/containers/LoginPage';
import PasswordRecoveryPage from '@/containers/PasswordRecoveryPage';
import VerificationCodePage from '@/containers/VerificationCodePage';
import ResetPasswordPage from '@/containers/ResetPasswordPage';

import { ROUTE_NAMES } from '@/constants';
import { USER_LOGOUT } from '@/store/loggedInUser/actionTypes';

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
    next({ name: ROUTE_NAMES.MAIN_PAGE });
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
      path: '/logout',
      name: ROUTE_NAMES.LOGOUT,
      beforeEnter: (to, from, next) => {
        store.dispatch(USER_LOGOUT);
        next({ name: ROUTE_NAMES.LOGIN });
      },
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
            syncNotifier: SyncNotifier,
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
              path: 'disputes-by-submitters',
              component: DisputesBySubmittersTable,
              name: ROUTE_NAMES.DISPUTES_BY_SUBMITTERS,
            },
            {
              path: 'resubmission-table',
              component: ResubmissionTable,
              name: ROUTE_NAMES.RESUBMISSION_TABLE,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      redirect: { name: ROUTE_NAMES.MAIN_PAGE },
    },
  ],
});

applyAuthInterceptors(identityApi, router);
applyAuthInterceptors(disputesApi, router);

export default router;
