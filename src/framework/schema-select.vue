<template>
  <div>
    <!-- 这里 dialog 不能放在 el-menu 里面
    否则按空格会触发 el-menu-item 的模拟 click 事件，导致弹框被关闭 -->
    <el-menu
      mode="horizontal"
      @select="selectSchema"
    >
      <slot />
      <el-submenu index="">
        <template v-slot:title>
          {{ schema.name }}
        </template>
        <el-menu-item
          v-for="schemaItem in schemaList"
          :key="schemaItem.id"
          :index="schemaItem.id"
        >
          {{ schemaItem.name }}
        </el-menu-item>
      </el-submenu>
      <el-button
        v-if="schemaId !== 'default'"
        type="text"
        style="margin-top: 10px;"
        @click="deleteSchema"
      >
        <i class="el-icon-delete" />
      </el-button>
      <el-button
        v-if="schemaId !== 'default'"
        type="text"
        style="margin-top: 10px; margin-left: 10px;"
        @click="showDialog"
      >
        <i class="el-icon-plus" />
      </el-button>

      <!-- <el-button
        style="margin-top: 10px; float:right;"
        @click="showDialog"
      >
        新建项目
      </el-button> -->
    </el-menu>
    <el-dialog
      v-model="dialogVisible"
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
import md5 from 'md5';
import getService from '../service'

export default {
  data() {
    return {
      schemaList: [],
      form: {},
      dialogVisible: false,
    }
  },
  async created() {
    const schemaSrv = getService('schema');
    this.schemaList = await schemaSrv.list();
  },
  computed: {
    schemaId: {
      get() {
        return this.$store.state.schemaId;
      },
      set(id) {
        if(id !== this.schemaId) {
          getService('schema').select(id);
          window.location.reload();
        }
      }
    },
    schema() {
      const schemaMap = _.keyBy(this.schemaList, 'id');
      return schemaMap[this.schemaId] || {};
    },
  },
  watch: {
    schemaId: {
      handler(id) {
        const schema = getService('schema').get(id);
        if(schema) {
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
    fileSelected() {
      const selectedFile = this.$refs['schemaFile'].files[0];
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = () => {
        this.$set(this.form, 'schemaStr', reader.result);
      }
    },
    submitDialog() {
      getService('schema').create({
        id: this.form.key,
        name: this.form.name,
        schemaStr: this.form.schemaStr,
      });
      window.location.reload();
    },
    selectSchema(schemaId) {
      this.schemaId = schemaId;
    },
    deleteSchema() {
      this.$confirm('确认删除?', null, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      }).then(() => {
        const schemaSrv = getService('schema');
        schemaSrv.delet(this.schemaId);
        
        this.schemaId = 'default';
        this.schemaList = schemaSrv.list();

        this.$message({
          type: 'success',
          message: '已删除',
        });
      }).catch(console.error);
    }
  }
}
</script>
