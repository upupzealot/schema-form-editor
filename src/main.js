import Vue from 'vue';
import ElementUI from 'element-ui';
import AntDesignVue from 'ant-design-vue';
import { $id } from '@/ui-kit/common/util-funcs'
const clipboardy = require('clipboardy');

import App from './portal.vue';
import FormEditor from '@/framework/form-editor.vue'
import ElementFormRender from '@/ui-kit/element-ui/form-render.vue'
import AntDesignFormRender from '@/ui-kit/ant-design/form-render.vue'
import CodeEditor from '@/framework/common/code-editor.vue'
import DraggableList from '@/ui-kit/common/draggable-list';
import DraggableListItem from '@/ui-kit/common/draggable-list-item';

import store from '@/framework/store';

import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.prototype.$id = $id;
Vue.prototype.$clipboard = clipboardy;

Vue.use(AntDesignVue);
Vue.use(ElementUI); // ElementUI 放在最后引入，保证类似 $message 的方法最终可用

Vue.component('CodeEditor', CodeEditor);
Vue.component('DraggableList', DraggableList);
Vue.component('DraggableListItem', DraggableListItem);

let uiKit = localStorage.getItem('ui-kit');
if(!uiKit) {
  uiKit = 'element-ui';
  localStorage.setItem('ui-kit', uiKit);
}
if(uiKit === 'element-ui') {
  Vue.component('FormRender', ElementFormRender);
}
if(uiKit === 'ant-design') {
  Vue.component('FormRender', AntDesignFormRender);
}
Vue.component('FormEditor', FormEditor);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
