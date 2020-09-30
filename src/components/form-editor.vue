<template>
  <el-row>
    <el-col class="form-editor">
      <el-form
        :label-position="formConf.labelPosition"
        :label-width="formConf.labelWidth"
        :gutter="formConf.gutter"
      >
        <el-divider content-position="left">
          表单项编辑器
        </el-divider>
        <el-row :gutter="15">
          <Draggable
            :list="fieldList"
            :group="{ put: true }"
            handle=".drag-handle"
            v-bind="dragOptions"
            @add="setActive"
            @end="setActive"
            style="padding-bottom: 50px;"
          >
            <el-col
              v-for="field in fieldList"
              :key="field.id"
              :span="Number(field.span) || 24"
            >
              <div
                :class="{'form-item-wrap': true, 'active': field === activeField}"
                @click="onSelect(field)"
              >
                <div class="control drag drag-handle">
                  <i class="el-icon-sort" />
                </div>

                <Input
                  v-if="field.type === 'input'"
                  :field="field"
                  :form="form"
                />
                <Select
                  v-if="field.type === 'select'"
                  :field="field"
                  :form="form"
                />
                <Radio
                  v-if="field.type === 'radio'"
                  :field="field"
                  :form="form"
                />
                <Checkbox
                  v-if="field.type === 'checkbox'"
                  :field="field"
                  :form="form"
                />
                <SSwitch
                  v-if="field.type === 'switch'"
                  :field="field"
                  :form="form"
                />
                <DatePicker
                  v-if="field.type === 'date-picker'"
                  :field="field"
                  :form="form"
                />

                <div class="control close">
                  <i
                    class="el-icon-close"
                    @click="onDelete(field)"
                  />
                </div>
              </div>
            </el-col>
          </Draggable>
        </el-row>
      </el-form>
    </el-col>
    <el-col>
      <el-button @click="printSchema">
        结构
      </el-button>
      <el-button @click="printData">
        数据
      </el-button>
    
      <el-button
        style="float: right;"
        @click="previewForm"
      >
        预览
      </el-button>
    </el-col>

    <!-- 结构预览对话框 -->
    <el-dialog
      title="Schema"
      :visible.sync="schemaDialogVisible"
    >
      <pre>{{ schemaStr }}</pre>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="schemaDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 数据预览对话框 -->
    <el-dialog
      title="Data"
      :visible.sync="dataDialogVisible"
    >
      <pre>{{ dataStr }}</pre>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dataDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 表单预览对话框 -->
    <el-dialog
      title="表单预览"
      width="70%"
      :visible.sync="previewDialogVisible"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <FormRender
              :schema="previewSchema"
              :data="previewData"
            />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <pre>{{ previewDataStr }}</pre>
          </el-card>
        </el-col>
      </el-row>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="previewDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<style>
.form-editor .form-item,
.form-editor .example-form-item {
  margin-bottom: 0;
}
.form-editor .form-item-wrap,
.form-editor .example-form-item {
  border: 1px dashed #eee;
  margin-bottom: 15px;
  padding: 10px 30px 10px 5px;
}
.item-bar .el-divider__text,
.form-editor .el-divider__text {
  color: #ccc;
}
.form-editor .example-form-item {
  padding-left: 50px;
}
.form-editor .form-item .el-form-item__label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.form-editor .form-item-wrap .drag-handle {
  line-height: 40px;
  cursor: move;
}
</style>

<style scoped>
.form-editor .form-item-wrap,
.form-editor .example-form-item {
  display: flex;
  flex-direction: row;
  align-items: center;

  border: 1px dashed #eee;
  padding: 10px 5px;
  margin-bottom: 15px;
}
.form-editor .form-item-wrap.active {
  border: 1px dashed #999;
  background-color: #f0f9ff;
}
.form-editor .form-item-wrap .form-item {
  flex-grow: 1;
  flex-shrink: 1;
}
.form-editor .form-item-wrap .control {
  flex-grow: 0;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-left: 5px;
}
.form-editor .form-item-wrap .control.drag {
  height: 40px;
  width: 40px;
  line-height: 40px;
}
.form-editor .form-item-wrap .control.close {
  cursor: pointer;
}
.form-editor .form-item-wrap .control.close .el-icon-close:hover {
  color: #F56C6C;
}
</style>

<script>
import _ from 'lodash';
import Draggable from 'vuedraggable';
import omitDeep from 'omit-deep-lodash';

import Input from '@/components/form-items/input';
import Select from '@/components/form-items/select';
import Radio from '@/components/form-items/radio';
import Checkbox from '@/components/form-items/checkbox';
import SSwitch from '@/components/form-items/switch';
import DatePicker from '@/components/form-items/date-picker';

import FormRender from '@/components/form-render';

export default {
  components: {
    Draggable,
    Input,
    Select,
    Radio,
    Checkbox,
    SSwitch,
    DatePicker,
    FormRender,
  },
  data() {
    return {
      form: {},
      schemaStr: '',
      schemaDialogVisible: false,
      dataStr: '',
      dataDialogVisible: false,
      previewSchema: {},
      previewData: {},
      previewDialogVisible: false,
      dragOptions: {
        animation: 200,
        disabled: false,
      }
    };
  },
  computed: {
    formConf() {
      return this.$store.state.formConf;
    },
    fieldList: {
      get() {
        return this.$store.state.fieldList;
      },
      set(fieldList) {
        this.$store.commit('setFieldList', fieldList);
      },
    },
    activeField: {
      get() {
        return this.$store.state.activeField;
      },
      set(field) {
        this.$store.commit('setActiveField', field);
      },
    },
    schema() {
      return omitDeep({
        formConf: _.cloneDeep(this.formConf),
        fieldList: _.cloneDeep(this.fieldList),
      }, 'id');
    },
    previewDataStr() {
      return JSON.stringify(this.previewData, null, 2);
    }
  },
  methods: {
    setActive({ newIndex }) {
      this.activeField = this.fieldList[newIndex];
    },
    onSelect(field) {
      this.activeField = field;
    },
    onDelete(field) {
      this.$confirm('确认删除?', null, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }).then(() => {
        this.fieldList = this.fieldList.filter(field => field.id !== this.activeField.id);
        this.activeField = {};

        this.$message({
          type: 'success',
          message: '已删除',
        });
      }).catch(() => {});
    },
    printSchema() {
      this.schemaStr = JSON.stringify(this.schema, null, 2);
      this.schemaDialogVisible = true;
    },
    printData() {
      this.dataStr = JSON.stringify(this.form, null, 2);
      this.dataDialogVisible = true;
    },
    previewForm() {
      this.previewSchema = _.cloneDeep(this.schema);
      this.previewDialogVisible = true;
    }
  },
};
</script>
