import Vue from 'vue'
import AntDesign from 'ant-design-vue'
import SchemaFormRender from '../../../src/ui-kit/ant-design'

if (isVue2) {
  Vue.use(AntDesign);
} else {
  global.UIKIT = AntDesign;
}

global.SchemaFormRender = SchemaFormRender;
global.pagePort = 4454;
