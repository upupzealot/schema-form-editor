<template>
  <Select
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import standardMixin from './standard-mixin'

import Select from '../form-items/select'

export default {
  components: {
    Select,
  },
  mixins: [standardMixin],
}
</script>