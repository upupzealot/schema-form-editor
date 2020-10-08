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
                    class="slot-content"
                  />
                  <Select
                    v-if="field.type === 'select'"
                    :field="field"
                    :data="data"
                    class="slot-content"
                  />
                  <Radio
                    v-if="field.type === 'radio'"
                    :field="field"
                    :data="data"
                    class="slot-content"
                  />
                  <Checkbox
                    v-if="field.type === 'checkbox'"
                    :field="field"
                    :data="data"
                    class="slot-content"
                  />
                  <SSwitch
                    v-if="field.type === 'switch'"
                    :field="field"
                    :data="data"
                    class="slot-content"
                  />
                  <DatePicker
                    v-if="field.type === 'date-picker'"
                    :field="field"
                    :data="data"
                    class="slot-content"
                  />
                  <!-- 工具项 -->
                  <Blank
                    v-if="field.type === 'blank'"
                    :field="field"
                    :data="data"
                    class="slot-content"
                  />
                    class="slot-content"
                  />
                </DraggableListItem>
              </el-col>
            </template>
          </DraggableList>
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
      <template slot="footer">
        <el-button
          type="primary"
          @click="schemaDialogVisible = false"
        >
          确 定
        </el-button>
      </template>
    </el-dialog>

    <!-- 数据预览对话框 -->
    <el-dialog
      title="Data"
      :visible.sync="dataDialogVisible"
    >
      <pre>{{ dataStr }}</pre>
      <template slot="footer">
        <el-button
          type="primary"
          @click="dataDialogVisible = false"
        >
          确 定
        </el-button>
      </template>
    </el-dialog>

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
  padding-left: 50px;
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
</style>

<script>
import _ from 'lodash';
import omitDeep from 'omit-deep-lodash';

import DraggableList from '@/components/common/draggable-list';
import DraggableListItem from '@/components/common/draggable-list-item';

import Input from '@/components/form-items/input';
import Select from '@/components/form-items/select';
import Radio from '@/components/form-items/radio';
import Checkbox from '@/components/form-items/checkbox';
import SSwitch from '@/components/form-items/switch';
import DatePicker from '@/components/form-items/date-picker';

import Blank from '@/components/form-items/blank';

import FormRender from '@/components/form-render';

export default {
  components: {
    DraggableList,
    DraggableListItem,
    Input,
    Select,
    Radio,
    Checkbox,
    SSwitch,
    DatePicker,
    Blank,
    FormRender,
  },
  data() {
    return {
      data: {},
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
    validRules() {
      return this.$store.state.validRules;
    },
    schema() {
      return omitDeep({
        formConf: this.formConf,
        fieldList: this.fieldList,
        validRules: this.validRules,
      }, 'id');
    },
    previewDataStr() {
      return JSON.stringify(this.previewData, null, 2);
    }
  },
  methods: {
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
      this.dataStr = JSON.stringify(this.data, null, 2);
      this.dataDialogVisible = true;
    },
    previewForm() {
      this.previewSchema = _.cloneDeep(this.schema);
      this.previewDialogVisible = true;
    },
    async validateForm() {
      const isValid = await this.$refs['previewForm'].validate();
    }
  },
};
</script>
