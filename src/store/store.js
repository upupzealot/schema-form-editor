import FormModule from './form'

export default {
  modules: {
    $root: FormModule,
  },
  state: {
    projectId: localStorage.getItem('projectId') || 'default',
    itemBarPosition: 'left',
    // 当前字段
    activeField: {},
    // 当前（子）表单
    activeForm: null, // 后续初始化为 $root
  },
  mutations: {
    setProjectId(state, projectId) {
      state.projectId = projectId;
    },
    setItemBarPosition(state, position) {
      state.itemBarPosition = position;
    },
    setActiveField(state, field) {
      state.activeField = field;
    },
    setActiveForm(state, form) {
      state.activeForm = form;
    },
  },
}
