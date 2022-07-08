<template>
  <StandardForm :config="{ hasValid: false }">
    <template v-slot:basic>
      <el-form-item
        label="排序图标"
        prop="sortIcon"
      >
        <el-radio-group
          v-if="uiKit === 'element-ui'"
          v-model="sortIcon"
        >
          <template v-if="isVue2">
            <el-radio-button
              v-for="icon in ['sort', 'rank', 'd-caret']"
              :key="icon"
              :label="`el-icon-${icon}`"
            >
              <i :class="`el-icon-${icon}`" />
            </el-radio-button>
          </template>
          <template v-else>
            <el-radio-button
              v-for="icon in ['Sort', 'Rank', 'DCaret']"
              :key="icon"
              :label="`el-icon-${icon}`"
            >
              <component :is="icon" />
            </el-radio-button>
          </template>
        </el-radio-group>
        <el-radio-group
          v-if="uiKit === 'ant-design'"
          v-model="sortIcon"
        >
          <el-radio-button
            v-for="icon in ['swap', 'drag', 'vertical-align-middle', 'column-height']"
            :key="icon"
            :label="icon"
          >
            <a-icon
              v-if="isVue2"
              :type="icon"
            />
            <component
              :is="icon"
              v-if="!isVue2"
            />
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="删除图标"
        prop="deleteIcon"
      >
        <el-radio-group
          v-if="uiKit === 'element-ui'"
          v-model="deleteIcon"
        >
          <template v-if="isVue2">
            <el-radio-button
              v-for="icon in ['close', 'circle-close', 'error', 'delete', 'delete-solid']"
              :key="icon"
              :label="`el-icon-${icon}`"
            >
              <i :class="`el-icon-${icon}`" />
            </el-radio-button>
          </template>
          <template v-else>
            <el-radio-button
              v-for="icon in ['Close', 'CircleClose', 'CircleCloseFilled', 'Delete', 'DeleteFilled']"
              :key="icon"
              :label="`el-icon-${icon}`"
            >
              <component :is="icon" />
            </el-radio-button>
          </template>
        </el-radio-group>
        <el-radio-group
          v-if="uiKit === 'ant-design'"
          v-model="deleteIcon"
        >
          <el-radio-button
            v-for="icon in ['close', 'close-circle', 'close-circle-filled', 'delete', 'delete-filled']"
            :key="icon"
            :label="icon"
          >
            <a-icon
              v-if="isVue2"
              :type="icon.replace('-filled', '')"
              :theme="/-filled$/.test(icon) ? 'filled' : undefined"
            />
            <component
              :is="icon"
              v-if="!isVue2"
            />
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="按钮文本"
        prop="createBtnText"
      >
        <el-input
          v-model="createBtnText"
          placeholder="新增列表项"
        />
      </el-form-item>
    </template>
  </StandardForm>
</template>

<script>
import isVue2 from '@/ui-kit/common/util-is-vue2';
import {
  SwapOutlined as Swap,
  DragOutlined as Drag,
  VerticalAlignMiddleOutlined as VerticalAlignMiddle,
  ColumnHeightOutlined as ColumnHeight,
  CloseOutlined as Close,
  CloseCircleOutlined as CloseCircle,
  CloseCircleFilled,
  DeleteOutlined as Delete,
  DeleteFilled,
} from '@ant-design/icons-vue'

import schemaItemMixin from '@/framework/schema-item/mixin';

const DEFAULT_ICONS = {
  'element-ui': {
    sortIcon: 'el-icon-sort',
    deleteIcon: 'el-icon-close',
  },
  'ant-design': {
    sortIcon: 'swap',
    deleteIcon: 'close',
  },
};

function getIcon(self, iconKey) {
  const uiKit = self.uiKit;
  if(!self.field[iconKey]) {
    return DEFAULT_ICONS[uiKit][iconKey];
  } else {
    return self.field[iconKey][uiKit] || DEFAULT_ICONS[uiKit][iconKey];
  }
}
function setIcon(self, iconKey, val) {
  const uiKit = self.uiKit;
  if(val === DEFAULT_ICONS[uiKit][iconKey]) {
    if(self.field[iconKey]) {
      if(Object.keys(self.field[iconKey]).length === 1) {
        self.$set(self.field, iconKey, undefined);
      } else {
        self.$set(self.field[iconKey], uiKit, undefined);
      }
    } else {
      // do nothing, keep empty
    }
  } else {
    if(self.field[iconKey]) {
      self.$set(self.field[iconKey], uiKit, val);
    } else {
      self.$set(self.field, iconKey, {});
      self.$set(self.field[iconKey], uiKit, val)
    }
  }
}

export default {
  type: 'item-list',
  components: {
    Swap, Drag, VerticalAlignMiddle, ColumnHeight,
    Close, CloseCircle, CloseCircleFilled, Delete, DeleteFilled,
  },
  mixins: [schemaItemMixin],
  data() {
    return {
      isVue2
    }
  },
  computed: {
    sortIcon: {
      get() {
        return getIcon(this, 'sortIcon');
      },
      set(val) {
        return setIcon(this, 'sortIcon', val);
      }
    },
    deleteIcon: {
      get() {
        return getIcon(this, 'deleteIcon');
      },
      set(val) {
        return setIcon(this, 'deleteIcon', val);
      }
    },
    createBtnText: {
      get() {
        return this.field.createBtnText;
      },
      set(val) {
        const createBtnText = val === '新增列表项' ? undefined : val;
        this.$set(this.field, 'createBtnText', createBtnText);
      }
    }
  }
};
</script>
