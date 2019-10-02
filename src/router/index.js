import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Base from '@/containers/Base';
import AppContent from '@/containers/AppContent';
import OrdersPage from '@/containers/OrdersPage';
import DisputePage from '@/containers/DisputePage';
import DisputesPage from '@/containers/DisputesPage';
import ClaimsResubmissionTable from '@/containers/ClaimsResubmissionTable';
import DisputesResubmissionTable from '@/containers/DisputesResubmissionTable';
import SyncNotifier from '@/containers/SyncNotifier';
import DisputesBySubmittersTable from '@/containers/DisputesBySubmittersTable';
import ClaimsBySubmittersTable from '@/containers/ClaimsBySubmittersTable';

import LoginPage from '@/containers/LoginPage';
import PasswordRecoveryPage from '@/containers/PasswordRecoveryPage';
import VerificationCodePage from '@/containers/VerificationCodePage';
import ResetPasswordPage from '@/containers/ResetPasswordPage';
import DisputesDashboardPage from '@/containers/DisputesDashboardPage';
import ClaimsDashboardPage from '@/containers/ClaimsDashboardPage';

import { ROUTE_NAMES } from '@/constants';
import { USER_LOGOUT } from '@/store/loggedInUser/actionTypes';

import AppHeader from '@/containers/AppHeader';
import DashboardSwitcher from '@/containers/typesSwitcher/DashboardSwitcher';
import OrdersSwitcher from '@/containers/typesSwitcher/OrdersSwitcher';
import SubmittersSwitcher from '@/containers/typesSwitcher/SubmittersSwitcher';
import ResubmissionTableSwitcher from '@/containers/typesSwitcher/ResubmissionTableSwitcher';
import LhsClaims from '@/containers/LHS/ClaimsLHS';
import LhsDisputes from '@/containers/LHS/DisputesLHS';

import identityApi from '@/services/identityApi';
import disputesApi from '@/services/disputesApi';
import applyAuthInterceptors from '@/services/authInterceptors';

import ClaimsOrders from '@/containers/ClaimsOrders';
import DisputesOrders from '@/containers/DisputesOrders';

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

function ordersGuard(to, from, next) {
  if (
    store.getters.isShowOrderWithoutExpectedComission ||
    store.getters.isShowOrderWithExpectedComission
  ) {
    next();
  } else {
    next({ name: ROUTE_NAMES.CLAIMS_DASHBOARD });
  }
}

function resubmissionGuard(to, from, next) {
  if (store.getters.isShowResubmissionTable) {
    next();
  } else {
    next({ name: ROUTE_NAMES.CLAIMS_DASHBOARD });
  }
}

function disputesGuard(to, from, next) {
  if (store.getters.isShowDispute) {
    next();
  } else {
    next({ name: ROUTE_NAMES.CLAIMS_DASHBOARD });
  }
}

function disputeGuard(to, from, next) {
  if (store.getters.isUpdateDispute) {
    next();
  } else {
    next({ name: ROUTE_NAMES.CLAIMS_DASHBOARD });
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
      redirect: 'claims',
      component: Base,
      beforeEnter: authGuard,
      children: [
        {
          path: '',
          redirect: 'claims',
          components: {
            header: AppHeader,
            main: AppContent,
            syncNotifier: SyncNotifier,
          },
          children: [
            {
              path: 'claims',
              redirect: { name: ROUTE_NAMES.CLAIMS_ORDERS },
              components: {
                lhs: LhsClaims,
                default: OrdersPage,
              },
              children: [
                {
                  path: 'dashboard',
                  name: ROUTE_NAMES.CLAIMS_DASHBOARD,
                  components: { switcher: DashboardSwitcher, content: ClaimsDashboardPage },
                },
                {
                  path: 'orders',
                  name: ROUTE_NAMES.CLAIMS_ORDERS,
                  components: { switcher: OrdersSwitcher, content: ClaimsOrders },
                  beforeEnter: ordersGuard,
                },
                {
                  path: 'list',
                  name: ROUTE_NAMES.DISPUTE_LIST,
                  components: { content: DisputesPage },
                  beforeEnter: disputesGuard,
                },
                {
                  path: 'edit/:disputeId',
                  name: ROUTE_NAMES.EDIT_DISPUTE,
                  components: { content: DisputePage },
                  beforeEnter: disputeGuard,
                },
                {
                  path: 'create/:orderId',
                  name: ROUTE_NAMES.CREAT_DISPUTE,
                  components: { content: DisputePage },
                  beforeEnter: disputeGuard,
                },
                {
                  path: 'submitters',
                  name: ROUTE_NAMES.CLAIMS_BY_SUBMITTERS,
                  components: { switcher: SubmittersSwitcher, content: ClaimsBySubmittersTable },
                },
                {
                  path: 'resubmission',
                  name: ROUTE_NAMES.CLAIMS_RESUBMISSION,
                  components: {
                    switcher: ResubmissionTableSwitcher,
                    content: ClaimsResubmissionTable,
                  },
                  beforeEnter: resubmissionGuard,
                },
              ],
            },
            {
              path: 'disputes',
              redirect: { name: ROUTE_NAMES.DISPUTES_ORDERS },
              components: {
                lhs: LhsDisputes,
                default: OrdersPage,
              },
              children: [
                {
                  path: 'dashboard',
                  name: ROUTE_NAMES.DISPUTES_DASHBOARD,
                  components: { switcher: DashboardSwitcher, content: DisputesDashboardPage },
                },
                {
                  path: 'orders',
                  name: ROUTE_NAMES.DISPUTES_ORDERS,
                  components: { switcher: OrdersSwitcher, content: DisputesOrders },
                  beforeEnter: ordersGuard,
                },
                {
                  path: 'submitters',
                  name: ROUTE_NAMES.DISPUTES_BY_SUBMITTERS,
                  components: { switcher: SubmittersSwitcher, content: DisputesBySubmittersTable },
                },
                {
                  path: 'resubmission',
                  name: ROUTE_NAMES.DISPUTES_RESUBMISSION,
                  components: {
                    switcher: ResubmissionTableSwitcher,
                    content: DisputesResubmissionTable,
                  },
                  beforeEnter: resubmissionGuard,
                },
              ],
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
