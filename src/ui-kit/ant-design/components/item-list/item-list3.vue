<template>
  <a-form-item
    v-if="activated"
    v-show="visible"
    :labelCol="labelCol"
    :wrapperCol="wrapperCol"
    :colon="false"
    :class="{'form-item': true, 'readonly': readonly}"
    style="margin-bottom: 0; display: flex;"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    
    <DraggableList
      :list="items"
    >
      <template #item="{ item }">
        <DraggableListItem
          :has-control="editable"
          :style="{ marginBottom: `${marginY}px` }"
          @delete="deleteItem(item)"
        >
          <Subform
            ref="subformItem"
            :field="field"
            :schema="subformSchema"
            :data="item"
            :sup-nodes="supNodes"
            :scenario="scenario"
            :style="{ width: '100%', marginBottom: `-${marginY}px` }"
          />
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
    marginY() {
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
        const subformItems = this.$refs['subformItem'] || [];
        await subformItems.map(async subform => {
          await subform.validate(resolve);
        });
      })
    }
  }
}
</script>
