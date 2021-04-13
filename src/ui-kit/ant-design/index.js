import InputToolbar from './components/input/input-toolbar.vue'
import InputNumberToolbar from './components/input-number/input-number-toolbar.vue'
export const ToolbarItems = [
  InputToolbar,
  InputNumberToolbar,
];
export const ToolbarUtils = [];

import InputEditor from './components/input/input-editor.vue'
import InputNumberEditor from './components/input-number/input-number-editor.vue'
export const EditorItems = [
  InputEditor,
  InputNumberEditor,
]

import InputSchema from './components/input/input-schema.vue'
import InputNumberSchema from './components/input-number/input-number-schema.vue'
export const SchemaItems = [
  InputSchema,
  InputNumberSchema,
]

import Input from './components/input/input.vue'
export {
  Input,
}

import FormRender from './form-render.vue'
export default FormRender;
