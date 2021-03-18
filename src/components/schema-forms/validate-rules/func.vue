<template>
  <RuleItemList
    label="函数"
    type="func"
  >
    <template v-slot:default="{ field, rule }">
      <FuncItem
        :field="field"
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
