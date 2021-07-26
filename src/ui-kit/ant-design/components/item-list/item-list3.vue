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
          <Subform
            ref="subformItem"
            :field="field"
            :schema="subformSchema"
            :data="item"
            :sup-nodes="supNodes"
            :scenario="scenario"
            :style="{ width: '100%', marginBottom: `-${subformMarginY}px` }"
          />
        </DraggableListItem>
      </template>
    </DraggableList>

    <a-button
      v-if="editable"
      style="display: block;"
      @click.stop="addItem"
    >
      新增列表项
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
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'

import DraggableList from '@/ui-kit/common/draggable-list3'
import DraggableListItem from '@/ui-kit/common/draggable-list-item'
import Subform from '../subform/subform'

export default {
  name: 'ItemList',
  components: {
    DraggableList,
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
    subformMarginY() {
      return this.schema.formConf.marginY || 15;
    },
    editable() {
      return !this.readonly && !this.disabled;
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
