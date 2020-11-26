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

// import { Switch as SSwitch } from 'schema-form-render'
import { Switch as SSwitch } from '../../form-render'

export default {
  components: {
    SSwitch,
  },
  mixins: [standardMixin],
}
</script>
