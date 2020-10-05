<template>
  <RuleItemList
    label="正则"
    type="regexp"
  >
    <template v-slot:default="{ field, rule }">
      <RegexpItem
        :field="field"
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
