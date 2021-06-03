import FormModule from './form'
import getService from '@/service'

export default {
  modules: {
    $root: FormModule,
  },
  state: {
    schemaId: getService('schema').currentId(),
    // 当前字段
    activeField: {},
    // 当前（子）表单
    activeForm: null, // 后续初始化为 $root
  },
  mutations: {
    setSchemaId(state, schemaId) {
      state.schemaId = schemaId;
    },
    setActiveField(state, field) {
      state.activeField = field;
    },
    setActiveForm(state, form) {
      state.activeForm = form;
    },
  },
}
