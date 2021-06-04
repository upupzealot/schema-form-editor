<template>
  <el-container>
    <el-header>
      <component
        :is="connected ? 'ProjectSelect' : 'SchemaSelect'"
      >
        <el-tag
          :type="connected ? 'primary' : 'info'"
          style="float: left; margin-top: 15px; cursor: pointer;"
          @click="onSwitchConnect"
        >
          <!-- <i
            v-if="!connected"
            class="el-icon-warning-outline"
          />
          <i
            v-if="connected"
            class="el-icon-circle-check"
          /> -->
          <i class="el-icon-connection" />
        </el-tag>
      </component>
    </el-header>
    <el-main class="layout-container">
      <div>
        <div class="item-bar-container">
          <el-card shadow="never">
            <ToolBar />
          </el-card>
        </div>

        <div class="form-editor-container">
          <el-card
            shadow="never"
            class="form-editor"
          >
            <el-divider content-position="left">
              表单项编辑器
            </el-divider>
            <FormEditor ref="rootEditor" />
          </el-card>
        </div>

        <div class="item-editor-container">
          <el-card shadow="never">
            <ItemEditor />
          </el-card>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #f9f9f9;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #efefef;
}

.layout-container {
  position: absolute;
  top: 80px;
  left: 28px;
  right: 28px;
  bottom: 0;
  display: flex;
}
/* item-bar 样式 */
.layout-container .item-bar-container {
  position: absolute;
  overflow-y: overlay;
  top: 0;
  left: 0;
  bottom: 0;
  width: 340px;
}
/* form-editor 样式 */
.layout-container .form-editor-container {
  position: absolute;
  top: 0;
  bottom: 20px;
  left: 355px;
  right: 515px;
  overflow-y: overlay;
}
/* item-editor 样式 */
.layout-container .item-editor-container {
  position: absolute;
  top: 0;
  bottom: 20px;
  right: 0;
  width: 500px;
  overflow-y: overlay;
}
</style>

<script>
import getService from '@/service'

import SchemaSelect from '@/framework/schema-select'
import ProjectSelect from '@/framework/project-select'
import ToolBar from '@/framework/toolbar';
// 全局引入，避免循环引用
// import FormEditor from '@/framework/form-editor';
import ItemEditor from '@/framework/item-editor';

export default {
  components: {
    SchemaSelect,
    ProjectSelect,
    ToolBar,
    // FormEditor,
    ItemEditor,
  },
  data() {
    return {
      connected: getService('server').status(),
    }
  },
  mounted() {
    const self = this;

    // 绑定“保存”键盘事件
    document.onkeydown = function(e) {
      if(e.keyCode === 83 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.stopPropagation();

        const schema = self.$refs['rootEditor'].schema;
        const schemaId = self.$store.state.schemaId;
        getService('schema').update(schemaId, schema);

        self.$message({
          message: '保存成功',
          type: 'success'
        });
      }
    };
  },
  methods: {
    async onSwitchConnect() {
      if(!this.connected) {
        await this.connect();
      } else {
        getService('server').disconnect()
      }
      window.location.reload();
    },
    async connect() {
      const { connected } = await getService('server').connect();
      this.connected = connected;
      if(!connected) {
        this.$message.error('服务连接失败')
      }
    }
  }
};
</script>
