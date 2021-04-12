<template>
  <RuleItemList
    label="函数"
    type="func"
  >
    <template #default="{ rule }">
      <FuncItem
        :rule="rule"
      />
    </template>
  </RuleItemList>
</template>

<script>
import RuleItemList from './rule-item-list'
import FuncItem from './func-item'

export default {
  components: {
    RuleItemList,
    FuncItem,
  },
}
</script>
