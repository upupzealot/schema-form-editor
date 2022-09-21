<template>
  <a-form-item
    v-if="activated"
    v-show="visible"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{
      marginBottom: colMarginY,
      display: 'flex',
      flexDirection: isLabelTop ? 'column' : '',
    }"
    :sfr-f="field.name"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>

    <a-button
      class="add"
      v-if="reversal && !firstItemAdd && editable"
      style="display: block;margin-bottom: 15px;"
      @click.stop="addItem"
    >
      {{ field.createBtnText || '新增列表项' }}
    </a-button>

    <DraggableList
      :list="items"
    >
      <template
        #item="{ item, index }"
        itemKey="id"
      >
        <DraggableListItem
          :has-control="editable"
          :has-delete="!firstItemAdd || firstItemAdd && index !== 0"
          :style="{ marginBottom: `${subformMarginY}px` }"
          :sfr-f="`${field.name}[${index}]`"
          @delete="deleteItem(item)"
        >
          <template #sortIcon>
            <component :is="sortIcon"/>
          </template>
          <template #deleteIcon="{ onDelete }">
            <component
              :is="deleteIcon"
              @click="onDelete"
            />
            <!-- <a-icon
              :type="deleteIcon.replace('-filled', '')"
              :theme="/-filled$/.test(deleteIcon) ? 'filled' : undefined"
              @click="onDelete"
            /> -->
          </template>
          <Subform
            ref="subformItem"
            :field="subformField"
            :schema="subformSchema"
            :data="item"
            :sup-nodes="supNodes"
            :scenario="scenario"
            :style="{ width: '100%', marginBottom: `-${subformMarginY}px` }"
          >
            <template
              v-for="slotName in slotNames"
              v-slot:[slotName]="args"
            >
              <slot
                :name="slotName"
                v-bind="args"
              />
            </template>
          </Subform>
          <div
            class="add control"
            v-if="firstItemAdd && index === 0 && editable"
          >
            <a-icon
              :type="addIcon.replace('-filled', '')"
              :theme="/-filled$/.test(addIcon) ? 'filled' : undefined"
              @click="addItem"
            />
          </div>
        </DraggableListItem>
      </template>
    </DraggableList>

    <a-button
      class="add"
      v-if="!reversal && editable"
      style="display: block;"
      @click.stop="addItem"
    >
      {{ field.createBtnText || '新增列表项' }}
    </a-button>
  </a-form-item>
</template>

<style>
.subform-wrap .list-item .form-item {
  margin-bottom: 15px;
}
/* fix: list-tem 子表单 form-item margin-bottom 消失 */
.subform-wrap.form-item .form-item {
  margin-bottom: 15px;
}
</style>

<style scoped>
.subform-wrap {
  width: 100%;
}
.subform-wrap .list-item {
  margin: 10px 0;
  border: 1px dashed #eee;
  padding: 15px 15px 0;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'
import itemListMixin from './item-list-mixin'

import DraggableList from '../../../common/draggable-list3'
import DraggableListItem from '../../../common/draggable-list-item'
import Subform from '../subform/subform'
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

export default {
  name: 'ItemList',
  components: {
    DraggableList,
    DraggableListItem,
    Subform,
    Swap, Drag, VerticalAlignMiddle, ColumnHeight,
    Close, CloseCircle, CloseCircleFilled, Delete, DeleteFilled,
  },
  mixins: [formItemMixin, itemListMixin],
}
</script>
