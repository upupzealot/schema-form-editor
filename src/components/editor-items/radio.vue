<template>
  <Radio
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import standardMixin from './standard-mixin'

import Radio from '../form-items/radio'

export default {
  components: {
    Radio,
  },
  mixins: [standardMixin],
}
</script>
