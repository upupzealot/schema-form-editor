<template>
  <el-dialog
    title="校验函数"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    class="func-form-dialog"
    width="70%"
  >
    <el-form
      ref="funcForm"
      :model="funcForm"
      :rules="rules"
      label-position="right"
      label-width="80px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="函数 key"
            prop="key"
          >
            <el-input v-model="funcForm.key" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="函数名称"
            prop="name"
          >
            <el-input v-model="funcForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="函数"
            prop="func"
          >
            <CodeEditor
              v-model="funcForm.func"
              height="240px"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="hide">取 消</el-button>
      <el-button
        type="primary"
        @click="onSubmit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import _ from 'lodash';

import CodeEditor from '@/components/common/code-editor';

export default {
  components: {
    CodeEditor,
  },
  data() {
    return {
      dialogVisible: false,
      mode: 'create',
      editKey: null,
      funcForm: {},
      rules: {
        name: [
          { required: true, message: '请输入函数名称', trigger: 'blur' },
        ],
        key: [
          { required: true, message: '请输入函数 key', trigger: 'blur' },
        ],
      }
    }
  },
  computed: {
    validFuncs() {
      return this.form.validFuncs || [];
    },
    funcStr: {
      get() {
        return this.funcForm.func || '';
      },
      set(funcStr) {
        this.$set(this.funcForm, 'func', funcStr);
      }
    }
  },
  methods: {
    show(funcForm) {
      this.mode = funcForm ? 'edit' : 'create';
      this.editKey = funcForm && funcForm.key;
      this.funcForm = _.cloneDeep(funcForm || {});
      this.dialogVisible = true;
    },
    onSubmit() {
      this.$refs['funcForm'].validate(valid => {
        if(valid) {
          this.$emit(this.mode, this.funcForm, this.editKey);
          this.hide();
        } else {
          return false;
        }
      })
    },
    hide() {
      this.dialogVisible = false;
    }
  }
}
</script>