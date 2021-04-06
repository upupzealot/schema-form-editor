<template>
  <el-dialog
    title="预设函数"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    class="func-preset-dialog"
    width="70%"
  >
    <div style="overflow: auto;">
      <el-button
        style="float: right; margin-bottom: 15px;"
        @click="showFormDialog()"
      >
        新增预设函数
      </el-button>
      <FuncFormDialog
        ref="funcFormDialog"
        @create="onCreate"
        @edit="onEdit"
      />
    </div>
    <div class="func-preset-table-wrapper">
      <el-table :data="validFuncs">
        <el-table-column
          prop="key"
          label="函数 key"
        />
        <el-table-column
          prop="name"
          label="函数名称"
        />
        <el-table-column
          prop="action"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-link
              type="primary"
              icon="el-icon-edit"
              @click="showFormDialog(scope.row)"
            >
              编辑
            </el-link>
            <el-link
              type="danger"
              icon="el-icon-delete"
              style="margin-left: 10px;"
              @click="onDelete(scope.row)"
            >
              删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template
      v-slot:footer
      class="dialog-footer"
    >
      <el-button @click="hide">取 消</el-button>
      <el-button
        type="primary"
        @click="hide"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<style>
.func-preset-dialog .el-dialog__body {
  padding-top: 10px;
}
</style>
<style scoped>
.func-preset-table-wrapper {
  width: 100%;
  min-height: 300px;
}
</style>

<script>
import ruleMixin from './rule-mixin';

import FuncFormDialog from './func-form-dialog'

export default {
  components: {
    FuncFormDialog,
  },
  mixins: [ruleMixin],
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    showFormDialog(funcForm) {
      this.$refs['funcFormDialog'].show(funcForm);
    },
    onCreate(funcForm) {
      this.validFuncs = [...this.validFuncs, funcForm];
    },
    onEdit(funcForm, key) {
      this.validFuncs = this.validFuncs.map(func => {
        return func.key === key ? funcForm : func;
      });
    },
    onDelete({ key, name }) {
      this.$confirm(`是否删除预设函数 ${name}?`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(()=>{
        this.validFuncs = this.validFuncs.filter(func => {
          return func.key !== key;
        });
      }).catch(()=>{});
    },
    show() {
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;
    }
  }
}
</script>