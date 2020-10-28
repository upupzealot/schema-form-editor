<template>
  <el-form-item
    v-if="activated"
    :label="field.label"
    class="subform-wrap form-item"
  >
    <DraggableList
      :list="items"
    >
      <DraggableListItem
        v-for="(item, i) in items"
        :key="i"
        @delete="deleteItem(item)"
      >
        <Subform
          ref="subformItem"
          :schema="subformSchema"
          :data="item"
          :sup-nodes="supNodes"
          style="width: 100%;"
        />
      </DraggableListItem>
    </DraggableList>

    <el-button
      style="display: block;"
      @click.stop="addItem"
    >
      新增列表项
    </el-button>
  </el-form-item>
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
import standardMixin from './standard-mixin'

import DraggableList from '../common/draggable-list'
import DraggableListItem from '../common/draggable-list-item'
import Subform from './subform'

export default {
  name: 'ItemList',
  components: {
    DraggableList,
    DraggableListItem,
    Subform
  },
  mixins: [standardMixin],
  computed: {
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
        await this.$refs['subformItem'].map(async subform => {
          await subform.validate(resolve);
        });
      })
    }
  }
}
</script>
