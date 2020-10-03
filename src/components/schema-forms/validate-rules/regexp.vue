<template>
  <el-form-item label="正则">
    <DraggableList
      :list="rules"
    >
      <DraggableListItem
        v-for="rule in regexpRules"
        :key="rule.id"
        :item="rule"
        @delete="deleteRule"
      >
        <RegexpRule
          :field="field"
          :rule="rule"
        />
      </DraggableListItem>
    </DraggableList>
    <el-button @click="createRule">
      新增校验规则
    </el-button>
  </el-form-item>
</template>

<script>
import DraggableList  from '@/components/common/draggable-list'
import DraggableListItem  from '@/components/common/draggable-list-item'

import ruleMinxin from './rule-mixin'
import RegexpRule from './regexp-rule'

export default {
  components: {
    DraggableList,
    DraggableListItem,
    RegexpRule
  },
  mixins: [ruleMinxin],
  computed: {
    regexpRules: {
      get() {
        return this.rules.filter(r => r.type === 'regexp')
      },
      set(rules) {
        this.rules = regexpRules.filter(r => r.type !== 'regexp').concat(rules);
      }
    }
  },
  methods: {
    createRule() {
      const id = this.$id();
      this.rules = [
        ...this.rules, {
        id,
        type: 'regexp',
      }];
    },
    deleteRule(rule) {
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