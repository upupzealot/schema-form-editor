<template>
  <Input
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import standardMixin from './standard-mixin'

import Input from '../form-items/input'

export default {
  components: {
    Input,
  },
  mixins: [standardMixin],
}
</script>
