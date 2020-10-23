<template>
  <FormRender
    v-if="enabled"
    :schema="schema"
    :data="data"
    :sup-nodes="supNodes"
  />
</template>

<script>
import standardMixin from './standard-mixin'

// import FormRender from '@/components/form-render'

export default {
  name: 'Subform',
  components: {
    // FormRender
  },
  mixins: [standardMixin],
  props: {
    schema: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>
