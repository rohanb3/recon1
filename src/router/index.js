import Vue from 'vue';
import Router from 'vue-router';

import Base from '@/containers/Base';
import OrdersPage from '@/containers/OrdersPage';
import DisputePage from '@/containers/DisputePage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'select-order' },
      component: Base,
      children: [
        {
          path: 'select-order',
          component: OrdersPage,
          name: 'select-order',
        },
        {
          path: 'dispute',
          component: DisputePage,
          name: 'dispute',
        },
      ],
    },
  ],
});
