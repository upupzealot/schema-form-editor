<template>
  <div>
    <el-form-item :label="label">
      <el-button @click="createItem">
        新增{{ label }}校验
      </el-button>
    </el-form-item>
    <el-form-item>
      <DraggableList
        style="margin-left: -40px;"
        :list="rules"
      >
        <DraggableListItem
          v-for="rule in ruleItems"
          :key="rule.id"
          :item="rule"
          @delete="deleteItem"
        >
          <slot :rule="rule" />
        </DraggableListItem>
      </DraggableList>
    </el-form-item>
  </div>
</template>

<script>
import DraggableList  from '@/components/common/draggable-list'
import DraggableListItem  from '@/components/common/draggable-list-item'

import ruleMinxin from './rule-mixin'

export default {
  components: {
    DraggableList,
    DraggableListItem,
  },
  mixins: [ruleMinxin],
  props: {
    type: {
      type: String,
      default() {
        return '';
      }
    },
    label: {
      type: String,
      default() {
        return '';
      }
    }
  },
  computed: {
    ruleItems: {
      get() {
        return this.rules.filter(r => r.type === this.type)
      },
      set(rules) {
        this.rules = ruleItems.filter(ri => ri.type !== this.type).concat(rules);
      }
    }
  },
  methods: {
    createItem() {
      const id = this.$id();
      this.rules = [
        ...this.rules, {
        id,
        type: this.type,
      }];
    },
    deleteItem(rule) {
      this.$confirm('确认删除?', null, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger',
      }).then(() => {
        this.rules = this.rules.filter(r => r.id !== rule.id);

        this.$message({
          type: 'success',
          message: '已删除',
        });
      }).catch(() => {});
    },
  }
}
</script>