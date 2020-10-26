<template>
  <el-menu
    mode="horizontal"
    @select="selectProject"
  >
    <el-submenu index="">
      <template slot="title">
        项目：{{ project.name }}
      </template>
      <el-menu-item
        v-for="projectItem in projects"
        :key="projectItem.id"
        :index="projectItem.id"
      >
        {{ projectItem.name }}
      </el-menu-item>
    </el-submenu>
    <el-button
      style="margin-top: 10px;"
      @click="showDialog"
    >
      新建项目
    </el-button>
    <el-dialog
      title="新建项目"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        v-model="form"
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="项目 Key">
          <el-input v-model="form.key" />
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitDialog"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-menu>
</template>

<script>
import md5 from 'md5';

export default {
  data() {
    let projects = localStorage.getItem('projects');
    if(projects) {
      projects = JSON.parse(projects);
    } else {
      projects = [{
        id: 'default',
        name: '默认',
      }];
    }
    return {
      id: localStorage.getItem('projectId') || 'default',
      projects: projects,
      form: {},
      dialogVisible: false,
    }
  },
  computed: {
    projectId: {
      get() {
        return this.id;
      },
      set(id) {
        this.id = id;
        localStorage.setItem('projectId', id);
      }
    },
    project() {
      const projectMap = _.keyBy(this.projects, 'id');
      return projectMap[this.id];
    }
  },
  watch: {
    projectId: {
      handler(id) {
        const schemaStr = localStorage.getItem(id);
        if(schemaStr && schemaStr !== 'undefined') {
          const schema = JSON.parse(schemaStr);

          let count = 0;
          function addId(form) {
            if(form.fieldList) {
              form.fieldList.forEach(field => {
                field.id = md5(`${Date.now()}${count}`).substr(0, 7);
                count++;
                addId(field);
              })
            }
          }
          addId(schema);

          this.$store.commit('$root/setFormConf', schema.formConf || {});
          this.$store.commit('$root/setFieldList', schema.fieldList || []);
          this.$store.commit('$root/setValidRules', schema.validRules || {});
        }
      },
      immediate: true,
    }
  },
  methods: {
    selectProject(projectId) {
      this.projectId = projectId;
    },
    showDialog() {
      this.form = {};
      this.dialogVisible = true;
    },
    submitDialog() {
      localStorage.setItem(this.form.key, '{}');
      this.projects.push({
        id: this.form.key,
        name: this.form.name,
      });
      localStorage.setItem('projects', JSON.stringify(this.projects));
      this.dialogVisible = false;
    }
  }
}
</script>
