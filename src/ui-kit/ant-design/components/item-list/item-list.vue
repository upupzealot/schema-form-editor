<template>
  <a-form-model-item
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
    
    <DraggableList
      :list="items"
    >
      <template #default="{ list }">
        <DraggableListItem
          v-for="(item, index) in list"
          :key="item.id"
          :has-control="editable"
          :style="{ marginBottom: `${subformMarginY}px` }"
          :sfr-f="`${field.name}[${index}]`"
          @delete="deleteItem(item)"
        >
          <template #sortIcon>
            <a-icon :type="sortIcon"/>
          </template>
          <template #deleteIcon="{ onDelete }">
            <a-icon
              :type="deleteIcon.replace('-filled', '')"
              :theme="/-filled$/.test(deleteIcon) ? 'filled' : undefined"
              @click="onDelete"
            />
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
        </DraggableListItem>
      </template>
    </DraggableList>

    <a-button
      v-if="editable"
      style="display: block;"
      @click.stop="addItem"
    >
      {{ field.createBtnText || '新增列表项' }}
    </a-button>
  </a-form-model-item>
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

import DraggableListItem from '../../../common/draggable-list-item'
import Subform from '../subform/subform'

export default {
  name: 'ItemList',
  components: {
    DraggableList: () => import('../../../common/draggable-list'),
    DraggableListItem,
    Subform
  },
  mixins: [formItemMixin, itemListMixin],
}
</script>
