<template>
  <Checkbox
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import standardMixin from './standard-mixin'

import { Checkbox } from 'schema-form-render'

export default {
  components: {
    Checkbox,
  },
  mixins: [standardMixin],
}
</script>
