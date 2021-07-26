<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    class="subform-wrap form-item"
    :style="{ marginBottom: colMarginY }"
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
          @delete="deleteItem(item)"
          :sfr-f="`${field.name}[${index}]`"
        >
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

    <el-button
      v-if="editable"
      style="display: block;"
      @click.stop="addItem"
    >
      新增列表项
    </el-button>
  </el-form-item>
</template>

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
import _ from 'lodash';

import formItemMixin from '../../common/form-item/mixin'

import DraggableListItem from '../../../common/draggable-list-item'
import Subform from '../subform/subform'

export default {
  name: 'ItemList',
  components: {
    DraggableList: () => import('../../../common/draggable-list'),
    DraggableListItem,
    Subform
  },
  mixins: [formItemMixin],
  props: {
    schema: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    slotNames() {
      const $root = this.supNodes[0];
      let slotNames = Object.keys($root.$slots || {});
      slotNames = slotNames.concat(Object.keys($root.$scopedSlots || {}));
      return _.uniq(slotNames);
    },
    subformMarginY() {
      return (this.schema.formConf && this.schema.formConf.marginY) || 15;
    },
    editable() {
      return !this.readonly && !this.disabled;
    },
    subformField() {
      return {
        ...this.field,
        effect: undefined,
      };
    },
    subformSchema() {
      return {
        ...this.field,
        type: 'subform',
      };
    },
    items: {
      get() {
        return this.data[this.field.name];
      },
      set(items) {
        this.$set(this.data, this.field.name, items);
      }
    }
  },
  created() {
    if(!this.items) {
      this.items = [];
    }
  },
  methods: {
    addItem() {
      this.items = [...this.items, {}];
    },
    deleteItem(item) {
      this.$confirm('确认删除?', null, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      }).then(() => {
        this.items = this.items.filter(i => i !== item);

        this.$message({
          type: 'success',
          message: '已删除',
        });
      }).catch(() => {});
    },
    async validate() {
      return new Promise(async resolve => {
        let subformItems = this.$refs['subformItem'] || [];
        if(!_.isArray(subformItems)) { // length === 1
          subformItems = [subformItems];
        }

        const valids = await Promise.all(subformItems.map(subform => {
          return subform.validate();
        }));
        let valiResult = true;
        valids.forEach(valid => {
          valiResult = valiResult && valid;
        })
        return resolve(valiResult);
      });
    }
  }
}
</script>
