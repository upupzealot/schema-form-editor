import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import md5 from 'md5'
const clipboardy = require('clipboardy');

import App from './portal.vue';
import FormEditor from '@/components/form-editor.vue'
import FormRender from './form-render'
import store from './store/index3';

import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);

app.config.globalProperties.$id = function () {
  return md5(Date.now()).substr(0, 7);
}
app.config.globalProperties.$clipboard = clipboardy;
app.config.globalProperties.$set = (obj, key, val) => {
  obj[key] = val;
};

app.use(ElementPlus);
app.component('FormEditor', FormEditor);
app.component('FormRender', FormRender);

app.use(store);
app.mount('#app');
