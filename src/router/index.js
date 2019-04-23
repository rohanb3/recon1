import Vue from 'vue';
import Router from 'vue-router';

import Base from '@/containers/Base';
import OrdersPage from '@/containers/OrdersPage';

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
          path: 'select-order',
          component: OrdersPage,
          name: 'select-order',
        },
      ],
    },
  ],
});
