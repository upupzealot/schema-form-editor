<template>
  <FormRender
    v-if="activated"
    v-show="visible"
    ref="formRender"
    :field="field"
    :schema="schema"
    :data="data"
    :scenario="scenario"
    :sup-nodes="supNodes"
    :class="{subform: true, 'readonly': readonly}"
  />
</template>

<script>
import standardMixin from './standard-mixin'

import FormRender from '../form-render'
import isVue2 from 'vue';

export default {
  name: 'Subform',
  components: {
    FormRender: isVue2 ? () => import('../form-render') : FormRender,
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
