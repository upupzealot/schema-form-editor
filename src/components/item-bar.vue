<template>
  <el-form label-width="80px">
    <el-row :gutter="15">
      <Draggable
        :list="itemList"
        :group="{ pull: 'clone', put: false }"
        :clone="onClone"
        :sort="false"
        class="item-bar"
      >
        <el-col
          v-for="item in itemList"
          :key="item.type"
        >
          <el-form-item
            :label="item.label"
            class="example-form-item"
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
        </el-col>
      </Draggable>
    </el-row>
  </el-form>
</template>

<style>
.item-bar .example-form-item,
.item-bar .example-form-item .el-form-item__label {
  cursor: move;
}
</style>

<style scoped>
.item-bar .example-form-item {
  border: 1px dashed #eee;
  padding: 10px;
  margin-bottom: 15px;
}
.item-bar .example-component {
  pointer-events: none;
}
</style>

<script>
import _ from 'lodash';
import Draggable from 'vuedraggable';

import itemDefaults from '@/components/form-items/defaults'

export default {
  components: {
    Draggable,
  },
  data() {
    return {
      form: {
        radio: 'option1',
        checkbox: ['option1'],
      },
      itemList: [{
        type: 'input',
        label: '单行文本',
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
    };
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
