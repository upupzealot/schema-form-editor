<template>
  <RuleItemList
    label="正则"
    type="regexp"
  >
    <template #default="{ rule }">
      <RegexpItem
        :rule="rule"
      />
    </template>
  </RuleItemList>
</template>

<script>
import RuleItemList from './rule-item-list'
import RegexpItem from './regexp-item'

export default {
  components: {
    RuleItemList,
    RegexpItem,
  },
}
</script>
