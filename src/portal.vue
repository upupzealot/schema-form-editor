<template>
  <el-container>
    <el-header>
      <ProjectSelect />
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
import ProjectSelect from '@/framework/project-select'

import ToolBar from '@/framework/toolbar';
// 全局引入，避免循环引用
// import FormEditor from '@/framework/form-editor';
import ItemEditor from '@/framework/item-editor';

export default {
  components: {
    ProjectSelect,
    ToolBar,
    // FormEditor,
    ItemEditor,
  },
  data() {
    const schemaStr = localStorage.getItem('schema');
    let schema = {};
    if(schemaStr && schemaStr !== 'undefined') {
      schema = JSON.parse(schemaStr);
    }

    return {
      schema,
    };
  },
  mounted() {
    const self = this;

    // 绑定“保存”键盘事件
    document.onkeydown = function(e) {
      if(e.keyCode === 83 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        e.stopPropagation();

        const schema = self.$refs['rootEditor'].schema;
        const projectId = self.$store.state.projectId;
        localStorage.setItem(projectId, JSON.stringify(schema));
        self.$message({
          message: '保存成功',
          type: 'success'
        });
      }
    };
  },
};
</script>
