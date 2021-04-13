<template>
  <el-row>
    <el-col class="item-bar">
      <el-form label-width="80px">
        <el-divider content-position="left">
          表单项
        </el-divider>
        <DraggableList
          :list="ToolbarItems"
          item-key="type"
          handle=".item-bar .example-form-item"
          :group="{ pull: 'clone', put: false }"
          :clone="onClone"
          :sortable="false"

          list-tag="el-row"
          :list-data="{
            class: ['draggable-list', 'example-form-item-list'],
            props: { gutter }, gutter,
          }"
          item-tag="el-col"
          :item-data="{ class: 'example-form-item' }"
        >
          <template #item="{ item }">
            <DraggableListItem :has-control="false">
              <el-form-item
                :label="item.label"
              >
                <component :is="`toolbar-${item.type}`" />
              </el-form-item>
            </DraggableListItem>
          </template>
        </DraggableList>

        <el-divider content-position="left">
          工具项
        </el-divider>
        <DraggableList
          :list="ToolbarUtils"
          item-key="type"
          handle=".item-bar .example-form-item"
          :group="{ pull: 'clone', put: false }"
          :clone="onClone"
          :sortable="false"

          list-tag="el-row"
          :list-data="{
            class: ['draggable-list', 'example-form-item-list'],
            props: { gutter }, gutter,
          }"
          item-tag="el-col"
          :item-data="{ class: 'example-form-item' }"
        >
          <template #item="{ item: util }">
            <DraggableListItem :has-control="false">
              <el-form-item
                :label="util.label"
              >
                <component :is="`toolbar-${util.type}`" />
              </el-form-item>
            </DraggableListItem>
          </template>
        </DraggableList>
      </el-form>
    </el-col>
  </el-row>
</template>

<style>
.item-bar .example-component {
  pointer-events: none;
}
.item-bar .draggable-list-item,
.item-bar .draggable-list-item .el-form-item__label {
  cursor: move;
}
.item-bar .example-form-item .el-form-item {
  width: 100%;
}

.example-form-item-list .example-form-item {
  width: 100%;
}
.bottom .example-form-item-list .example-form-item {
  width: 300px;
}
.bottom .el-divider {
  display: none;
}
</style>

<script>
import _ from 'lodash';
// import DraggableList from '@/framework/common/draggable-list';
// import DraggableListItem from '@/framework/common/draggable-list-item';

import {
  ToolbarItems as ElementItems,
  ToolbarUtils as ElementUtils
} from '../ui-kit/element-ui/index'
import {
  ToolbarItems as AntDesignItems,
  ToolbarUtils as AntDesignUtils
} from '../ui-kit/ant-design/index'

const uiKit = localStorage.getItem('ui-kit');
let ToolbarItems = [];
let ToolbarUtils = [];
if(uiKit === 'element-ui') {
  ToolbarItems = ElementItems;
  ToolbarUtils = ElementUtils;
}
if(uiKit === 'ant-design') {
  ToolbarItems = AntDesignItems;
  ToolbarUtils = AntDesignUtils;
}

export default {
  components: {
    ..._(ToolbarItems)
    .keyBy('type')
    .mapKeys((v, k) => {
      return `toolbar-${k}`
    })
    .value(),
    ..._(ToolbarUtils)
    .keyBy('type')
    .mapKeys((v, k) => {
      return `toolbar-${k}`
    })
    .value(),
  },
  data() {
    return {
      ToolbarItems,
      ToolbarUtils,
    };
  },
  computed: {
    formConf() {
      return this.$store.state.$root.formConf;
    },
    gutter() {
      return this.formConf.gutter || 20;
    },
  },
  methods: {
    onClone(item) {
      const id = this.$id();
      return {
        id,
        type: item.type,
        label: item.label,
        name: `${item.type}-${id}`,
        ..._.cloneDeep(item.defaultSchema),
      };
    },
  },
};
</script>
