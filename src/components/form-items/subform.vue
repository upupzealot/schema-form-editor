<template>
  <FormRender
    :schema="schema"
    :data="data"
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
