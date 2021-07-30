import Vue from 'vue'
// import ElementUI from 'element-ui'
// import ElementPlus from 'element-plus'
import SchemaFormRender from '../../../src/ui-kit/element-ui'

if (isVue2) {
  const ElementUI = require('element-ui');
  Vue.use(ElementUI);
} else {
  const ElementPlus = require('element-plus');
  global.UIKIT = ElementPlus;
}

global.SchemaFormRender = SchemaFormRender;
global.pagePort = 4452;
