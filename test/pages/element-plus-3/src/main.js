import { createApp } from 'vue'
import App from './app.vue'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);

app.config.globalProperties.$set = (obj, key, val) => {
  obj[key] = val;
};
app.config.globalProperties.$delete = (obj, key) => { delete obj[key] };

app.use(ElementPlus);

app.mount('#app')
