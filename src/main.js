import Vue from 'vue';
import ElementUI from 'element-ui';
import { $id } from '@/framework/common/util-funcs'
const clipboardy = require('clipboardy');

import App from './portal.vue';
import FormEditor from '@/framework/form-editor.vue'
import FormRender from '@/ui-kit/element-ui/form-render.vue'
import CodeEditor from '@/framework/common/code-editor.vue'
import DraggableList from '@/framework/common/draggable-list';
import DraggableListItem from '@/framework/common/draggable-list-item';

import store from '@/framework/store';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$id = $id;
Vue.prototype.$clipboard = clipboardy;

Vue.use(ElementUI);

Vue.component('CodeEditor', CodeEditor);
Vue.component('DraggableList', DraggableList);
Vue.component('DraggableListItem', DraggableListItem);
Vue.component('FormRender', FormRender);
Vue.component('FormEditor', FormEditor);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
