<template>
  <el-row>
    <!-- 表单项 -->
    <el-col class="form-editor">
      <el-form
        :label-position="formConf.labelPosition"
        :label-width="formConf.labelWidth"
        :gutter="formConf.gutter"
      >
        <el-row :gutter="formConf.gutter">
          <DraggableList
            :list="fieldList"
            :group="{put: true}"
            :selectable="true"
            style="padding-bottom: 50px;"
            @select="onSelect"
          >
            <template
              v-for="field in fieldList"
            >
              <el-col
                :key="field.id"
                :span="Number(field.span) || 24"
              >
                <DraggableListItem
                  :item="field"
                  :active="field === activeField"
                  @select="onSelect(field)"
                  @delete="onDelete(field)"
                >
                  <!-- 表单项 -->
                  <Input
                    v-if="field.type === 'input'"
                    :field="field"
                    :data="data"
                    :sup-nodes="supNodeList"
                    class="slot-content"
                  />
                  <Select
                    v-if="field.type === 'select'"
                    :field="field"
                    :data="data"
                    :sup-nodes="supNodeList"
                    class="slot-content"
                  />
                  <Radio
                    v-if="field.type === 'radio'"
                    :field="field"
                    :data="data"
                    :sup-nodes="supNodeList"
                    class="slot-content"
                  />
                  <Checkbox
                    v-if="field.type === 'checkbox'"
                    :field="field"
                    :data="data"
                    :sup-nodes="supNodeList"
                    class="slot-content"
                  />
                  <SSwitch
                    v-if="field.type === 'switch'"
                    :field="field"
                    :data="data"
                    :sup-nodes="supNodeList"
                    class="slot-content"
                  />
                  <DatePicker
                    v-if="field.type === 'date-picker'"
                    :field="field"
                    :data="data"
                    :sup-nodes="supNodeList"
                    class="slot-content"
                  />
                  <!-- 工具项 -->
                  <Blank
                    v-if="field.type === 'blank'"
                    :field="field"
                    :data="data"
                    :sup-nodes="supNodeList"
                    class="slot-content"
                  />
                  <Subform
                    v-if="field.type === 'subform'"
                    :field="field"
                    :data="data"
                    :sup-nodes="supNodeList"
                    class="slot-content"
                  />
                  <IItemList
                    v-if="field.type === 'item-list'"
                    :field="field"
                    :data="data"
                    :sup-nodes="supNodeList"
                    class="slot-content"
                  />
                </DraggableListItem>
              </el-col>
            </template>
          </DraggableList>
        </el-row>
      </el-form>
    </el-col>

    <!-- 控制按钮 -->
    <el-col>
      <el-button
        :size="btnSize"
        @click="printSchema"
      >
        结构
      </el-button>
      <el-button
        :size="btnSize"
        @click="printData"
      >
        数据
      </el-button>
    
      <el-button
        :size="btnSize"
        style="float: right;"
        @click="previewForm"
      >
        预览
      </el-button>
    </el-col>
    <!-- 结构预览对话框 -->
    <JsonDialog
      :visible.sync="schemaDialogVisible"
      :content="schema"
      :download-filename="`${projectId}.schema.json`"
    />
    <!-- 数据预览对话框 -->
    <JsonDialog
      :visible.sync="dataDialogVisible"
      :content="data"
      :download-filename="`${projectId}.default.json`"
    />

    <!-- 表单预览对话框 -->
    <el-dialog
      v-if="previewDialogVisible"
      title="表单预览"
      width="70%"
      :visible.sync="previewDialogVisible"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <FormRender
              ref="previewForm"
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
      <template slot="footer">
        <el-button
          type="default"
          style="float: left;"
          @click="validateForm"
        >
          校 验
        </el-button>
        <el-button
          type="primary"
          @click="previewDialogVisible = false"
        >
          确 定
        </el-button>
      </template>
    </el-dialog>
  </el-row>
</template>

<style>
.item-bar .el-divider__text,
.form-editor .el-divider__text {
  color: #ccc;
}
.form-editor .example-form-item .draggable-list-item {
  padding-left: 40px;
  padding-right: 30px;
}
.form-editor .example-form-item .draggable-list-item .el-form-item {
  width: 100%;
}
</style>

<style scoped>
.draggable-list-item .el-form-item {
  width: 100%;
}
.v-not-activated {
  opacity: .4;
}
.v-readonly {
  background: linear-gradient(45deg, #f7f7f7 25%, transparent 0, transparent 50%, #f7f7f7 0, #f7f7f7 75%, transparent 0);
  background-size:20px 20px;
}
.v-disabled {
  background-color: #f7f7f7;
}
</style>

<script>
import _ from 'lodash';
import omitDeep from 'omit-deep-lodash';

import DraggableList from '@/components/common/draggable-list';
import DraggableListItem from '@/components/common/draggable-list-item';
import JsonDialog from './json-dialog';

import Input from '@/components/editor-items/input';
import Select from '@/components/editor-items/select';
import Radio from '@/components/editor-items/radio';
import Checkbox from '@/components/editor-items/checkbox';
import SSwitch from '@/components/editor-items/switch';
import DatePicker from '@/components/editor-items/date-picker';

import Blank from '@/components/form-items/blank';
import Subform from '@/components/editor-items/subform';
import IItemList from '@/components/editor-items/item-list';
import FormStoreModule from '@/store/form.js';

// import FormRender from '@/components/form-render';

export default {
  name: 'FormEditor',
  components: {
    DraggableList,
    DraggableListItem,
    JsonDialog,
    Input,
    Select,
    Radio,
    Checkbox,
    SSwitch,
    DatePicker,
    Blank,
    Subform,
    IItemList,
    // FormRender,
  },
  props: {
    initSchema: {
      type: Object,
      default() {
        return {};
      }
    },
    supNodes: {
      type: Array,
      default() {
        return null;
      }
    },
    formKey: {
      type: String,
      default() {
        return '';
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      schemaStr: '',
      schemaDialogVisible: false,
      dataStr: '',
      dataDialogVisible: false,
      previewSchema: {},
      previewData: {},
      previewDialogVisible: false,
    };
  },
  computed: {
    projectId() {
      return this.$store.state.projectId;
    },
    supNodeList() {
      if(this.supNodes) {
        return [...this.supNodes, this];
      } else {
        return [this];
      }
    },
    // 当前正在编辑的表单和字段
    activeForm: {
      get() {
        return this.$store.state.activeForm;
      },
      set(form) {
        this.$store.commit('setActiveForm', form);
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
    // 计算属性
    storeKey() {
      return this.formKey || '$root';
    },
    form() {
      return this.$store.state[this.storeKey];
    },
    formConf() {
      return this.form.formConf;
    },
    fieldList: {
      get() {
        return this.form.fieldList;
      },
      set(fieldList) {
        if(!this.formKey) {
          this.$store.commit('$root/setFieldList', fieldList);
        } else {
          this.$store.commit(`${this.storeKey}/setFieldList`, fieldList);
        }
      },
    },
    validRules() {
      return this.form.validRules;
    },
    btnSize() {
      return this.formKey ? 'mini' : '';
    },
    schema() {
      const state = this.$store.state;
      
      function mapFields(fields) {
        const fieldList = _.cloneDeep(fields || []);
        return fieldList.map(field => {
          if(field.type === 'subform' || field.type === 'item-list') {
            return {
              ...field,
              ...state[field.name],
              fieldList: mapFields(state[field.name]?.fieldList),
            };
          } else {
            return field;
          }
        })
      }

      return omitDeep({
        formConf: this.formConf,
        fieldList: mapFields(this.fieldList),
        validRules: this.validRules,
      }, ['id']);
    },
    previewDataStr() {
      return JSON.stringify(this.previewData, null, 2);
    }
  },
  watch: {
    formKey: {
      handler(newKey, oldKey) {
        if(newKey) {
          this.$store.registerModule(newKey, FormStoreModule);
          this.$store.commit(`${newKey}/setFormKey`, this.storeKey);

          if(this.initSchema.formConf) {
            this.$store.commit(`${newKey}/setFormConf`, this.initSchema.formConf);
          }
          if(this.initSchema.fieldList) {
            this.$store.commit(`${newKey}/setFieldList`, this.initSchema.fieldList);
          }
          if(this.initSchema.validRules) {
            this.$store.commit(`${newKey}/setValidRules`, this.initSchema.validRules);
          }
          // this.activeForm = this.form;
          if(oldKey) {
            // TODO
            // store 属性迁移
            this.$store.unregisterModule(oldKey);
          }
        }
      },
      immediate: true,
    }
  },
  methods: {
    onSelect(field, $event) {
      this.activeField = field;
      this.activeForm = this.form;
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
      this.dataStr = JSON.stringify(this.data, null, 2);
      this.dataDialogVisible = true;
    },
    previewForm() {
      this.previewSchema = _.cloneDeep(this.schema);
      this.previewData = _.cloneDeep(this.data);
      this.previewDialogVisible = true;
    },
    async validateForm() {
      const isValid = await this.$refs['previewForm'].validate();
      if(isValid) {
        this.$message({
          message: '校验通过',
          type: 'success',
        });
      } else {
        this.$message({
          message: '校验未通过',
          type: 'error',
        });
      }
    }
  },
};
</script>
