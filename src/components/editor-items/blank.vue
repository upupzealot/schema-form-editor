<template>
  <Blank
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import standardMixin from './standard-mixin'

// import { Blank } from 'schema-form-render'
import { Blank } from '../../form-render'

export default {
  components: {
    Blank,
  },
  mixins: [standardMixin],
}
</script>
