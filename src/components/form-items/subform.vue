<template>
  <FormRender
    v-if="activated"
    ref="formRender"
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
  },
  methods: {
    async validate() {
      return new Promise(async resolve => {
        await this.$refs['formRender'].validate(resolve);
      })
    }
  }
}
</script>
