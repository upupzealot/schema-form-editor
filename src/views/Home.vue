<template>
  <el-container>
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
            <FormEditor />
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
import ItemBar from '@/components/item-bar';
// 全局引入，避免循环引用
// import FormEditor from '@/components/form-editor';
import ItemEditor from '@/components/item-editor';

export default {
  components: {
    ItemBar,
    // FormEditor,
    ItemEditor,
  },
};
</script>
