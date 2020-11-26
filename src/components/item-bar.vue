<style scoped>
.layout-container.bottom .example-form-item-list .example-form-item {
  width: 300px;
}
.layout-container.bottom .el-divider {
  display: none;
}
</style>

<template>
  <el-row>
    <el-col class="item-bar">
      <el-form label-width="80px">
        <el-divider content-position="left">
          表单项
        </el-divider>
        <el-row :gutter="formConf.gutter">
          <DraggableList
            :list="itemList"
            handle=".item-bar .example-form-item"
            :group="{ pull: 'clone', put: false }"
            :clone="onClone"
            :sortable="false"
            class="example-form-item-list"
          >
            <el-col
              v-for="item in itemList"
              :key="item.type"
              class="example-form-item"
            >
              <DraggableListItem :has-control="false">
                <el-form-item
                  :label="item.label"
                >
                  <template v-if="item.type === 'input'">
                    <el-input
                      v-model="form.input"
                      placeholder="请输入"
                      class="example-component"
                    />
                  </template>

                  <template v-if="item.type === 'select'">
                    <el-select
                      v-model="form.select"
                      placeholder="下拉选项"
                      style="width: 100%"
                      class="example-component"
                    >
                      <el-option
                        label="选项一"
                        value="option1"
                      />
                      <el-option
                        label="选项二"
                        value="option2"
                      />
                    </el-select>
                  </template>

                  <template v-if="item.type === 'radio'">
                    <el-radio
                      v-model="form.radio"
                      label="option1"
                      class="example-component"
                    >
                      选项一
                    </el-radio>
                    <el-radio
                      v-model="form.radio"
                      label="option2"
                      class="example-component"
                    >
                      选项二
                    </el-radio>
                  </template>

                  <template v-if="item.type === 'checkbox'">
                    <el-checkbox-group v-model="form.checkbox">
                      <el-checkbox
                        label="option1"
                        class="example-component"
                      >
                        选项一
                      </el-checkbox>
                      <el-checkbox
                        label="option2"
                        class="example-component"
                      >
                        选项二
                      </el-checkbox>
                    </el-checkbox-group>
                  </template>

                  <template v-if="item.type === 'switch'">
                    <el-switch
                      v-model="form.switch"
                      active-text="开"
                      inactive-text="关"
                      class="example-component"
                    />
                  </template>

                  <template v-if="item.type === 'date-picker'">
                    <el-date-picker
                      v-model="form.datePicker"
                      type="date"
                      style="width:100%"
                      placeholder="选择日期"
                      class="example-component"
                    />
                  </template>
                </el-form-item>
              </DraggableListItem>
            </el-col>
          </DraggableList>
        </el-row>
        <el-divider content-position="left">
          工具项
        </el-divider>
        <el-row :gutter="formConf.gutter">
          <DraggableList
            :list="utilList"
            handle=".item-bar .example-form-item"
            :group="{ pull: 'clone' }"
            :clone="onClone"
            :sort="false"
            class="example-form-item-list"
          >
            <el-col
              v-for="util in utilList"
              :key="util.type"
              class="example-form-item"
            >
              <DraggableListItem :has-control="false">
                <el-form-item
                  :label="util.label"
                  style="width: 100%;"
                >
                  <template v-if="util.type === 'blank'">
                    <div
                      class="example-component"
                      :style="{
                        border: '1px dashed #eee',
                        height: '40px',
                      }"
                    />
                  </template>

                  <template v-if="util.type === 'subform'">
                    <div
                      class="example-component"
                      :style="{
                        border: '1px dashed #eee',
                        lineHeight: 0,
                        height: '40px',
                      }"
                    >
                      <el-tag size="mini">
                        子表单
                      </el-tag>
                    </div>
                  </template>

                  <template v-if="util.type === 'item-list'">
                    <div
                      class="example-component"
                      :style="{
                        border: '1px dashed #eee',
                        lineHeight: 0,
                        height: '40px',
                      }"
                    >
                      <el-tag size="mini">
                        列表
                      </el-tag>
                    </div>
                  </template>
                </el-form-item>
              </DraggableListItem>
            </el-col>
          </DraggableList>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>

<style>
.item-bar .draggable-list-item {
  padding: 10px;
}
.item-bar .draggable-list-item,
.item-bar .draggable-list-item .el-form-item__label {
  cursor: move;
}
</style>

<style scoped>
.item-bar .example-component {
  pointer-events: none;
}
</style>

<script>
import _ from 'lodash';
import DraggableList from '@/components/common/draggable-list';
import DraggableListItem from '@/components/common/draggable-list-item';

import { defaults as itemDefaults } from 'schema-form-render';

export default {
  components: {
    DraggableList,
    DraggableListItem,
  },
  data() {
    return {
      // 示例表单项默认值
      form: {
        radio: 'option1',
        checkbox: ['option1'],
      },
      // 表单项列表
      itemList: [{
        type: 'input',
        label: '文本框',
        ...itemDefaults['input']
      }, {
        type: 'select',
        label: '下拉选项',
        ...itemDefaults['select']
      }, {
        type: 'radio',
        label: '单选框',
        ...itemDefaults['radio']
      }, {
        type: 'checkbox',
        label: '复选框',
        ...itemDefaults['checkbox']
      }, {
        type: 'switch',
        label: '开关',
        ...itemDefaults['switch']
      }, {
        type: 'date-picker',
        label: '时间选择',
        ...itemDefaults['datePicker']
      }],
      // 工具项列表
      utilList: [{
        type: 'blank',
        label: '空白占位',
        ...itemDefaults['blank']
      }, {
        type: 'subform',
        label: '子表单',
        ...itemDefaults['subform']
      }, {
        type: 'item-list',
        label: ' 列表',
        ...itemDefaults['itemList']
      }],
    };
  },
  computed: {
    formConf() {
      return this.$store.state.$root.formConf;
    },
  },
  methods: {
    onClone(item) {
      const id = this.$id();
      return {
        id,
        name: `${item.type}-${id}`,
        ..._.cloneDeep(item),
      };
    },
  },
};
</script>
