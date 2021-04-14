import InputToolbar from './components/input/input-toolbar.vue'
import InputNumberToolbar from './components/input-number/input-number-toolbar.vue'
import InputIpToolbar from './components/input-ip/input-ip-toolbar.vue'
export const ToolbarItems = [
  InputToolbar,
  InputNumberToolbar,
  InputIpToolbar,
];
export const ToolbarUtils = [];

import InputEditor from './components/input/input-editor.vue'
import InputNumberEditor from './components/input-number/input-number-editor.vue'
import InputIpEditor from './components/input-ip/input-ip-editor.vue'
export const EditorItems = [
  InputEditor,
  InputNumberEditor,
  InputIpEditor,
]

import InputSchema from './components/input/input-schema.vue'
import InputNumberSchema from './components/input-number/input-number-schema.vue'
import InputIpSchema from './components/input-ip/input-ip-schema.vue'
export const SchemaItems = [
  InputSchema,
  InputNumberSchema,
  InputIpSchema,
]

import Input from './components/input/input.vue'
import InputNumber from './components/input-number/input-number.vue'
import InputIp from './components/input-ip/input-ip.vue'
export {
  Input,
  InputNumber,
  InputIp,
}

import FormRender from './form-render.vue'
export default FormRender;
