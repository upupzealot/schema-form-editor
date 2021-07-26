import Vue from 'vue'
import ElementUI from 'element-ui'
import SchemaFormRender from '../../../src/ui-kit/element-ui'

Vue.use(ElementUI);

global.SchemaFormRender = SchemaFormRender;
global.pagePort = 4452;
