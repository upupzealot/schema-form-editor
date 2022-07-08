<template>
  <div>
    <!-- 这里 dialog 不能放在 el-menu 里面
    否则按空格会触发 el-menu-item 的模拟 click 事件，导致弹框被关闭 -->
    <el-menu
      mode="horizontal"
    >
      <slot />
      <el-submenu index="">
        <template v-slot:title>
          项目：{{ project.name }}
        </template>
        <el-menu-item
          v-for="projectItem in projects"
          :key="projectItem.id"
          :index="projectItem.id"
          @click="selectProject(projectItem.id)"
        >
          {{ projectItem.name }}
        </el-menu-item>
      </el-submenu>
      <el-button
        type="text"
        style="margin-top: 10px;"
        @click="showDialog('edit')"
      >
        <i
          v-if="isVue2"
          class="el-icon-edit"
        />
        <el-icon
          v-else
          :size="14"
        >
          <Edit />
        </el-icon>
      </el-button>
      <el-button
        type="text"
        style="margin-top: 10px;"
        @click="deleteProject"
      >
        <i
          v-if="isVue2"
          class="el-icon-delete"
        />
        <el-icon
          v-else
          :size="14"
        >
          <Delete />
        </el-icon>
      </el-button>
      <el-button
        type="text"
        style="margin-top: 10px; margin-left: 10px;"
        @click="showDialog('create')"
      >
        <i
          v-if="isVue2"
          class="el-icon-plus"
        />
        <el-icon
          v-else
          :size="14"
        >
          <Plus />
        </el-icon>
      </el-button>

      <UiKitSelect />
    </el-menu>
    <el-dialog
      v-model="dialogVisible"
      title="新建项目"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        ref="projectForm"
        :model="form"
        label-position="right"
        label-width="80px"
        :rules="validRules"
      >
        <el-form-item
          label="项目名称"
          prop="name"
        >
          <el-input v-model.trim="form.name" />
        </el-form-item>
        <el-form-item
          label="项目路径"
          prop="cwd"
        >
          <el-input v-model.trim="form.cwd" />
        </el-form-item>
      </el-form>
      <template
        v-slot:footer
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="submitDialog"
        >
          确 定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import getService from '../service'
import UiKitSelect from './ui-kit-select'
import isVue2 from '@/ui-kit/common/util-is-vue2';

export default {
  components: {
    UiKitSelect,
  },
  data() {
    return {
      isVue2,
      projects: [],
      form: {},
      formMode: 'create',
      validRules: {
        name: [{
          required: true,
          message: '请输入项目名称'
        }],
        cwd: [{
          required: true,
          message: '请输入项目路径'
        }]
      },
      dialogVisible: false,
    }
  },
  computed: {
    projectId: {
      get() {
        return this.$store.state.projectId;
      },
      set(id) {
        this.$store.commit('setProjectId', id);
        getService('project').select(id);
        window.location.reload();
      }
    },
    project() {
      const projectMap = _.keyBy(this.projects, 'id');
      return projectMap[this.projectId] || {};
    },
  },
  async created() {
    const projectSrv = getService('project');
    this.projects = await projectSrv.list();
  },
  methods: {
    showDialog(mode) {
      if(mode === 'create') {
        this.form = {};
      } else { // mode === 'edit'
        const project = getService('project').current();
        this.form = {
          name: project.name,
          cwd: project.id,
        };
      }

      this.formMode = mode;
      this.dialogVisible = true;
    },
    async submitDialog() {
      const validatePro = new Promise(resolve => {
        this.$refs['projectForm'].validate(isValid => {
          resolve(isValid);
        })
      })
      const isValid = await validatePro;
      if(!isValid) {
        return;
      }

      if(this.formMode === 'create') {
        try {
          getService('project').create({
            name: this.form.name,
            id: this.form.cwd,
          });
        } catch(err) {
          return this.$message.error(err.message);
        }
      } else { // formMode === 'edit'
        getService('project').update({
          name: this.form.name,
          id: this.form.cwd,
        });
      }

      window.location.reload();
    },
    selectProject(projectId) {
      this.projectId = projectId;
    },
    deleteProject() {
      this.$confirm('确认删除?', null, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      }).then(() => {
        const projectSrv = getService('project');
        projectSrv.delet(this.projectId);

        this.$message({
          type: 'success',
          message: '已删除',
        });

        this.projectId = ''; // trigger reload
        // this.projects = projectSrv.list();
      }).catch(console.error);
    }
  }
}
</script>
