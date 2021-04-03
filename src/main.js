import Vue from 'vue';
import ElementUI from 'element-ui';
import md5 from 'md5'
const clipboardy = require('clipboardy');

import App from './portal.vue';
import FormEditor from '@/components/form-editor.vue'
import FormRender from './form-render'
import CodeEditor from '@/components/common/code-editor.vue'
import DraggableList from '@/components/common/draggable-list';
import DraggableListItem from '@/components/common/draggable-list-item';

import store from './store';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$id = function () {
  return md5(Date.now()).substr(0, 7);
}
Vue.prototype.$clipboard = clipboardy;

Vue.use(ElementUI);
Vue.component('FormEditor', FormEditor);
Vue.component('FormRender', FormRender);
Vue.component('CodeEditor', CodeEditor);
Vue.component('DraggableList', DraggableList);
Vue.component('DraggableListItem', DraggableListItem);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
