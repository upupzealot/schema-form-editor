<template>
  <div>
    <!-- 这里 dialog 不能放在 el-menu 里面
    否则按空格会触发 el-menu-item 的模拟 click 事件，导致弹框被关闭 -->
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
        v-if="projectId !== 'default'"
        type="text"
        style="margin-top: 10px;"
        @click="deleteProject"
      >
        删除
      </el-button>

      <el-button
        style="margin-top: 10px; float:right;"
        @click="showDialog"
      >
        新建项目
      </el-button>
      
      <div style="margin-top: 18px; float: right; margin-right: 20px;">
        <span style="color: #ccc; margin-right: 10px;">
          工具条位置
        </span>
        <el-radio
          v-model="itemBarPosition"
          label="left"
          style="margin-right: 10px;"
        >
          左侧
        </el-radio>
        <el-radio
          v-model="itemBarPosition"
          label="bottom"
        >
          底部
        </el-radio>
      </div>
    </el-menu>
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
        <el-form-item label="初始结构">
          <el-input
            v-model="form.schemaStr"
            :rows="5"
            type="textarea"
          />
          <input
            ref="schemaFile"
            hidden
            type="file"
            accept="application/json"
            @change="fileSelected"
          >
          <el-button
            style="position: absolute; right: 0; top: 0;"
            icon="el-icon-upload2"
            circle
            @click="selectSchemaFile"
          />
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
  </div>
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
    const position = localStorage.getItem('item-bar-position') || 'left';
    this.$store.commit('setItemBarPosition', position);
    return {
      projects,
      form: {},
      dialogVisible: false,
    }
  },
  computed: {
    projectId: {
      get() {
        return this.$store.state.projectId;
      },
      set(id) {
        if(id !== this.projectId) {
          this.$store.commit('setProjectId', id);
          localStorage.setItem('projectId', id);
          window.location.reload();
        }
      }
    },
    project() {
      const projectMap = _.keyBy(this.projects, 'id');
      return projectMap[this.projectId];
    },
    itemBarPosition: {
      get() {
        return this.$store.state.itemBarPosition;
      },
      set(position) {
        this.$store.commit('setItemBarPosition', position);
        localStorage.setItem('item-bar-position', position);
      }
    },
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

          this.$store.commit('$root/setFormConf', schema.formConf || {
            labelWidth: '80px',
            labelPosition: 'right',
            gutter: 20,
          });
          this.$store.commit('$root/setFieldList', schema.fieldList || []);
          this.$store.commit('$root/setValidFuncs', schema.validFuncs || []);
          this.$store.commit('$root/setValidRules', schema.validRules || {});
        }
      },
      immediate: true,
    }
  },
  methods: {
    showDialog() {
      this.form = {};
      this.dialogVisible = true;
    },
    selectSchemaFile() {
      this.$refs['schemaFile'].click();
    },
    fileSelected(file) {
      const selectedFile = this.$refs['schemaFile'].files[0];
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = () => {
        this.$set(this.form, 'schemaStr', reader.result);
      }
    },
    submitDialog() {
      const schema = JSON.parse(this.form.schemaStr || '{}');
      localStorage.setItem(this.form.key, JSON.stringify(schema || {}));
      this.projects.push({
        id: this.form.key,
        name: this.form.name,
      });
      localStorage.setItem('projects', JSON.stringify(this.projects));
      localStorage.setItem('projectId' ,this.form.key);
      window.location.reload();
    },
    selectProject(projectId) {
      this.projectId = projectId;
    },
    deleteProject(project) {
      this.$confirm('确认删除?', null, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      }).then(() => {
        const deleteId = this.projectId;
        localStorage.removeItem(deleteId);

        this.projectId = 'default';
        this.projects = this.projects.filter(p => p.id !== deleteId);
        localStorage.setItem('projects', JSON.stringify(this.projects));

        this.$message({
          type: 'success',
          message: '已删除',
        });
      }).catch(() => {});
    }
  }
}
</script>
