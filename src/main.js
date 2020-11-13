import Vue from 'vue';
import ElementUI from 'element-ui';
import md5 from 'md5'
const clipboardy = require('clipboardy');

import App from './app.vue';
import FormEditor from '@/components/form-editor.vue'
import FormRender from '@/components/form-render.vue'
import router from './router';
import store from './store/store';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$id = function () {
  return md5(Date.now()).substr(0, 7);
}
Vue.prototype.$clipboard = clipboardy;

Vue.use(ElementUI);
Vue.component('FormEditor', FormEditor);
Vue.component('FormRender', FormRender);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
