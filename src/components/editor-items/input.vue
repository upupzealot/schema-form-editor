<template>
  <Input
    :field="field"
    :data="data"
    :status="vStatus"
    :sup-nodes="supNodes"
    :class="{'v-not-enabled': !vStatus.vEnabled}"
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
