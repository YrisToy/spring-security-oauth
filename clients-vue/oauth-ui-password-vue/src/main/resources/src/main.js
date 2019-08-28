import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';

import App from './App.vue'
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.use(VueRouter);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
