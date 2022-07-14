import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import AntDesignVue from 'ant-design-vue';
import { $id } from '@/ui-kit/common/util-funcs'
const clipboardy = require('clipboardy');

import App from './portal.vue';
import FormEditor from '@/framework/form-editor.vue'
import ElementFormRender from '@/ui-kit/element-ui/form-render.vue'
import AntDesignFormRender from '@/ui-kit/ant-design/form-render.vue'
import CodeEditor from '@/framework/common/code-editor3.vue'
import DraggableList from '@/ui-kit/common/draggable-list3';
import DraggableListItem from '@/ui-kit/common/draggable-list-item';
import store from '@/framework/store/index3';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from "element-plus/es/locale/lang/zh-cn"; // element-plus 语言

import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$id = $id;
app.config.globalProperties.$clipboard = clipboardy;
app.config.globalProperties.$set = (obj, key, val) => {
  obj[key] = val;
};
app.config.globalProperties.$delete = (obj, key) => { delete obj[key] };

app.use(AntDesignVue);
// ElementUI 放在最后引入，保证类似 $message 的方法最终可用
app.use(ElementPlus, {
  // 全局注册 element-plus
  locale: zhCn, // 使用中文
});

app.component('CodeEditor', CodeEditor);
app.component('DraggableList', DraggableList);
app.component('DraggableListItem', DraggableListItem);

let uiKit = localStorage.getItem('ui-kit');
if(!uiKit) {
  uiKit = 'element-ui';
  localStorage.setItem('ui-kit', uiKit);
}
if(uiKit === 'element-ui') {
  app.component('FormRender', ElementFormRender);
}
if(uiKit === 'ant-design') {
  app.component('FormRender', AntDesignFormRender);
}
app.component('FormEditor', FormEditor);

app.use(store);
app.mount('#app');
