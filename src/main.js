import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './app.vue';
import router from './router';
import store from './store/store';
import md5 from 'md5'

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$id = function () {
  return md5(Date.now()).substr(0, 7);
}

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
