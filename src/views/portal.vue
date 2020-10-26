<template>
  <el-container>
    <el-header>
      <ProjectSelect />
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="never">
            <ItemBar />
          </el-card>
        </el-col>

        <el-col :span="9">
          <el-card
            shadow="never"
            class="form-editor"
          >
            <el-divider content-position="left">
              表单项编辑器
            </el-divider>
            <FormEditor ref="rootEditor" />
          </el-card>
        </el-col>

        <el-col :span="9">
          <el-card shadow="never">
            <ItemEditor />
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import md5 from 'md5';

import ProjectSelect from '@/components/project-select'

import ItemBar from '@/components/item-bar';
// 全局引入，避免循环引用
// import FormEditor from '@/components/form-editor';
import ItemEditor from '@/components/item-editor';

export default {
  components: {
    ProjectSelect,
    ItemBar,
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
        const projectId = localStorage.getItem('projectId') || 'default';
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
