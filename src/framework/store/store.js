import FormModule from './form'
import getService from '@/service'

export default {
  modules: {
    $root: FormModule,
  },
  state: {
    projectId: getService('project').currentId(),
    schemaId: getService('schema').currentId(),
    // 当前字段
    activeField: {},
    // 当前（子）表单
    activeForm: null, // 后续初始化为 $root
  },
  mutations: {
    setProjectId(state, projectId) {
      state.projectId = projectId;
    },
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
