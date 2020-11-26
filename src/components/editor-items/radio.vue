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

import { Radio } from 'schema-form-render'

export default {
  components: {
    Radio,
  },
  mixins: [standardMixin],
}
</script>
