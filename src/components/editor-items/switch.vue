<template>
  <SSwitch
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import standardMixin from './standard-mixin'

import SSwitch from '../form-items/switch'

export default {
  components: {
    SSwitch,
  },
  mixins: [standardMixin],
}
</script>
