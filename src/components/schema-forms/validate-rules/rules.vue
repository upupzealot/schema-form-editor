<template>
  <Required />
</template>

<script>
import ruleMinxin from './rule-mixin'

import Required from './required';

export default {
  components: {
    Required,
  },
  mixins: [ruleMinxin],
  
}
</script>
