import Vue from 'vue';
import Router from 'vue-router';

import Base from '@/views/Base';
import AppContent from '@/views/AppContent';
import OrdersPage from '@/containers/OrdersPage';

import LHS from '@/containers/LHS';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Base,
      children: [
        {
          path: '',
          redirect: 'select-order',
          components: {
            lhs: LHS,
            main: AppContent,
          },
          children: [
            {
              path: 'select-order',
              component: OrdersPage,
              name: 'select-order',
            },
          ],
        },
      ],
    },
  ],
});
