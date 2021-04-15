import InputToolbar from './components/input/input-toolbar.vue'
import InputNumberToolbar from './components/input-number/input-number-toolbar.vue'
import InputIpToolbar from './components/input-ip/input-ip-toolbar.vue'
import SelectToolbar from './components/select/select-toolbar.vue'
export const ToolbarItems = [
  InputToolbar,
  InputNumberToolbar,
  InputIpToolbar,
  SelectToolbar,
];
export const ToolbarUtils = [];

import InputEditor from './components/input/input-editor.vue'
import InputNumberEditor from './components/input-number/input-number-editor.vue'
import InputIpEditor from './components/input-ip/input-ip-editor.vue'
import SelectEditor from './components/select/select-editor.vue'
export const EditorItems = [
  InputEditor,
  InputNumberEditor,
  InputIpEditor,
  SelectEditor,
]

import InputSchema from './components/input/input-schema.vue'
import InputNumberSchema from './components/input-number/input-number-schema.vue'
import InputIpSchema from './components/input-ip/input-ip-schema.vue'
import SelectSchema from './components/select/select-schema.vue'
export const SchemaItems = [
  InputSchema,
  InputNumberSchema,
  InputIpSchema,
  SelectSchema
]

import Input from './components/input/input.vue'
import InputNumber from './components/input-number/input-number.vue'
import InputIp from './components/input-ip/input-ip.vue'
import Select from './components/select/select.vue'
export {
  Input,
  InputNumber,
  InputIp,
  Select,
}

import FormRender from './form-render.vue'
export default FormRender;
