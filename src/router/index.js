import Vue from 'vue';
import Router from 'vue-router';

import Base from '@/containers/Base';
import OrdersPage from '@/containers/OrdersPage';
import DisputePage from '@/containers/DisputePage';
import DisputesPage from '@/containers/DisputesPage';

import { ROUTE_NAMES } from '@/constants';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main-page',
      redirect: { name: ROUTE_NAMES.SELECT_ORDER },
      component: Base,
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
    {
      path: '*',
      redirect: { name: ROUTE_NAMES.SELECT_ORDER },
    },
  ],
});
