import Vue from 'vue'
import App from './app.vue'

import AntDesign from 'ant-design-vue1'
import 'ant-design-vue1/dist/antd.css'

Vue.config.productionTip = false

Vue.use(AntDesign);

new Vue({
  render: h => h(App),
}).$mount('#app');
