import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'vue-popperjs/dist/vue-popper.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker';
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css';

import App from './App';
import router from './router/index';
import store from './store/index';
import i18n from './i18n';
import datepickerOptions from '@/services/options';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#3c91f7',
    success: '#7fcb2c',
    error: '#e6354b',
  },
  iconfont: 'md',
});

Vue.use(AirbnbStyleDatepicker, datepickerOptions);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
