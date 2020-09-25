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
          <el-card shadow="never">
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
import FormEditor from '@/components/form-editor';
import ItemEditor from '@/components/item-editor';

export default {
  components: {
    ItemBar,
    FormEditor,
    ItemEditor,
  },
};
</script>
