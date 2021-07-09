<template>
  <el-row>
    <!-- 表单项 -->
    <el-col class="form-editor">
      <component
        :is="editorIs"
        :layout="layout"
        :label-position="labelPosition"
        :label-align="labelAlign"
        :label-width="labelWidth"
        :label-col="{ span: labelCol }"
        :wrapper-col="{ span: 24 - labelCol }"
      >
        <DraggableList
          :list="fieldList"
          item-key="id"
          :group="{ put: true, pull: true }"
          :selectable="true"
          style="padding-bottom: 50px;"
          list-tag="el-row"
          :list-data="{ props: { gutter: marginX }, gutter: marginX }"
          item-tag="el-col"
          :item-data="field => {
            return {
              span: Number(field.span) || 24
            }
          }"
          @add="onAdd"
          @select="onSelect"
        >
          <template #item="{ item: field }">
            <DraggableListItem
              :item="field"
              :active="field === activeField"
              :style="{ marginBottom: `${marginY}px` }"
              @select="onSelect(field)"
              @delete="onDelete(field)"
            >
              <!-- 表单项 -->
              <component
                :is="support(`editor-${field.type}`) ? `editor-${field.type}` : 'unsupported-item'"
                v-bind="{
                  formConf,
                  field,
                  data,
                  supNodes: support(`editor-${field.type}`) ? supNodeList : [],
                  class: 'slot-content'
                }"
              />
            </DraggableListItem>
          </template>
        </DraggableList>
      </component>
    </el-col>

    <!-- 控制按钮 -->
    <el-col>
      <el-button
        :size="btnSize"
        @click="showSchemaDialog"
      >
        结构
      </el-button>
      <el-button
        :size="btnSize"
        @click="showDataDialog"
      >
        数据
      </el-button>
    
      <el-button
        :size="btnSize"
        style="float: right;"
        @click="showPreviewDialog"
      >
        预览
      </el-button>
      <el-button
        v-if="isRoot"
        :size="btnSize"
        style="float: right;"
        @click="showPropDialog"
      >
        配置
      </el-button>
    </el-col>
    <!-- 结构预览对话框 -->
    <JsonDialog
      v-model:visible="schemaDialogVisible"
      title="Schema"
      :visible.sync="schemaDialogVisible"
      :content="schema"
      :download-filename="`${schemaId}.schema.json`"
    />
    <!-- 数据预览对话框 -->
    <JsonDialog
      v-model:visible="dataDialogVisible"
      title="Data"
      :visible.sync="dataDialogVisible"
      :content="data"
      :download-filename="`${schemaId}.default.json`"
    />
    <!-- Config 对话框 -->
    <JsonDialog
      v-model:visible="propDialogVisible"
      title="Config"
      :visible.sync="propDialogVisible"
      :content.sync="config"
      :download-filename="`${schemaId}.config.json`"
      :editable="true"
    />
    <!-- 表单预览对话框 -->
    <el-dialog
      v-if="previewDialogVisible"
      v-model="previewDialogVisible"
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
              :config="config"
            >
              <template #aaa="{ field }">
                <div>Slot aaa: {{ field && field.name }}</div>
              </template>
              <template #bbb="{ field }">
                <div>Slot bbb: {{ field && field.name }}</div>
              </template>
              <template #ccc="{ field }">
                <div>Slot ccc: {{ field && field.name }}</div>
              </template>
              <template #ddd="{ field }">
                <div>Slot ddd: {{ field && field.name }}</div>
              </template>
            </FormRender>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <pre>{{ previewDataStr }}</pre>
          </el-card>
        </el-col>
      </el-row>
      <template v-slot:footer>
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
.form-editor .example-form-item .draggable-list-item .el-form-item,
.form-editor .example-form-item .draggable-list-item .a-form-item,
.form-editor .example-form-item .draggable-list-item .a-form-model-item {
  width: 100%;
}
</style>

<style scoped>
.draggable-list-item .el-form-item,
.draggable-list-item .ant-form-item {
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
import isVue2, { reactive } from 'vue';
import _ from 'lodash';
import omitDeep from 'omit-deep-lodash';

// import DraggableList from '@/framework/common/draggable-list';
// import DraggableListItem from '@/framework/common/draggable-list-item';
import JsonDialog from './common/json-dialog';
import UnsupportedItem from './unsupported-item.vue';

import { EditorItems as ElementItems } from '@/ui-kit/element-ui/index'
import { EditorItems as AntDesignItems } from '@/ui-kit/ant-design/index'
const uiKit = localStorage.getItem('ui-kit');
let EditorItems = [];
let editorIs = 'div';
if(uiKit === 'element-ui') {
  EditorItems = ElementItems;
  editorIs = 'el-form';
}
if(uiKit === 'ant-design') {
  EditorItems = AntDesignItems;
  editorIs = isVue2 ? 'a-form-model' : 'a-form';
}
const ItemMap = _(EditorItems)
  .keyBy('type')
  .mapKeys((v, k) => {
    return `editor-${k}`
  })
  .value();

import FormStoreModule from '@/framework/store/form.js';

// import FormRender from '@/ui-kit/element-ui/form-render.vue';

export default {
  name: 'FormEditor',
  components: {
    // DraggableList,
    // DraggableListItem,
    JsonDialog,
    UnsupportedItem,
    // FormRender,
    ...ItemMap,
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
        return reactive ? reactive({}) : {};
      }
    }
  },
  data() {
    let config = localStorage.getItem('$config') || '{}';
    try {
      config = JSON.parse(config);
    } catch(err) {
      config = {};
    }

    return {
      editorIs,
      schemaDialogVisible: false,
      dataDialogVisible: false,
      config,
      propDialogVisible: false,
      previewSchema: {},
      previewData: {},
      previewDialogVisible: false,
    };
  },
  computed: {
    schemaId() {
      return this.$store.state.schemaId;
    },
    isRoot() {
      return !this.supNodes;
    },
    supNodeList() {
      if(this.supNodes) {
        return [...this.supNodes, this];
      } else {
        return [this];
      }
    },
    mixedConfig() { // 模拟 FormRender 下的 mixedConfig 属性
      return this.config;
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
      return this.form.formConf || {};
    },
    labelWidth() {
      return this.formConf.labelWidth || '80px';
    },
    labelCol() {
      return this.labelPosition === 'right'
        || this.labelPosition === 'left'
        ? this.formConf.labelCol || 3
        : 0;
    },
    marginX() {
      return this.formConf.marginX || 20;
    },
    marginY() {
      return this.formConf.marginY || 15;
    },
    labelPosition() {
      return this.formConf.labelPosition || 'right';
    },
    layout() {
      return this.labelPosition === 'right'
        || this.labelPosition === 'left'
        ? 'horizontal' : 'vertical';
    },
    labelAlign() {
      return this.layout === 'horizontal' ? this.labelPosition : 'right';
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
    validFuncs() {
      return this.form.validFuncs;
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
          if(field.type === 'subform'
            || field.type === 'wrapper'
            || field.type === 'item-list') {
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
        validFuncs: this.validFuncs,
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
          this.$store.commit('addModule', newKey);
          this.$store.commit(`${newKey}/setFormKey`, this.storeKey);

          if(this.initSchema.formConf) {
            this.$store.commit(`${newKey}/setFormConf`, this.initSchema.formConf);
          }
          if(this.initSchema.fieldList) {
            this.$store.commit(`${newKey}/setFieldList`, this.initSchema.fieldList);
          }
          if(this.initSchema.validFuncs) {
            this.$store.commit(`${newKey}/setValidFuncs`, this.initSchema.validFuncs);
          }
          if(this.initSchema.validRules) {
            this.$store.commit(`${newKey}/setValidRules`, this.initSchema.validRules);
          }

          // formKey 变换
          if(oldKey) {
            // TODO
            // store 属性迁移
            this.$store.unregisterModule(oldKey);
            this.$store.commit('removeModule', oldKey);
          }
        }
      },
      immediate: true,
    },
    config(val) {
      localStorage.setItem('$config', JSON.stringify(val));
    },
  },
  methods: {
    support(type) {
      return !!ItemMap[type];
    },
    onAdd({ item, index }) {
      // 有 item.id：说明新增项是表单编辑器内拖拽而来
      // 无 item.id：说明新增项是外部拖拽而来
      if(item && item.id) {
        this.fieldList.splice(index, 0, item);
      }
    },
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
        this.validRules[this.activeField.name] = undefined;
        this.activeField = {};

        this.$message({
          type: 'success',
          message: '已删除',
        });
      }).catch(() => {});
    },
    showSchemaDialog() {
      this.schemaDialogVisible = true;
    },
    showDataDialog() {
      this.dataDialogVisible = true;
    },
    showPropDialog() {
      this.propDialogVisible = true;
    },
    showPreviewDialog() {
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
