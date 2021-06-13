import FormModule from './form'
import getService from '@/service'

export default {
  modules: {
    $root: FormModule,
  },
  state: {
    projectId: getService('project').currentId(),
    schemaId: getService('schema').currentId(),
    modules: [],
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
    addModule(state, moduleKey) {
      state.modules.push(moduleKey);
    },
    removeModule(state, moduleKey) {
      state.modules = state.modules.filter(m => m !== moduleKey);
    }
  },
  actions: {
    reset({ state }) {
      state.projectId = getService('project').currentId();
      state.schemaId = getService('schema').currentId();

      state.modules.forEach(module => {
        if(this.hasModule(module)) {
          this.unregisterModule(module);
        }
      });
      state.modules = [];

      state.activeField = {};
      state.activeForm = state.$root;
    }
  }
}
