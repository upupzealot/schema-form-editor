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
import formItemMixin from '@/framework/common/form-item/mixin'

import FormRender from '../../form-render'
import isVue2 from 'vue';

export default {
  name: 'Wrapper',
  components: {
    FormRender: isVue2 ? () => import('../../form-render') : FormRender,
  },
  mixins: [formItemMixin],
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
