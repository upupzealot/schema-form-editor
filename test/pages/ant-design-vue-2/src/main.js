import { createApp } from 'vue';
import App from './app.vue'

import AntDesign from 'ant-design-vue2'
import 'ant-design-vue2/dist/antd.css'

const app = createApp(App);
app.use(AntDesign);

app.mount('#app');
