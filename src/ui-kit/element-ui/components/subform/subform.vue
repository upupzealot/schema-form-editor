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
    :style="{ marginBottom: colMarginY }"
    :sfr-f="field.name"
  >
    <template
      v-for="slotName in slotNames"
      v-slot:[slotName]="args"
    >
      <slot
        :name="slotName"
        v-bind="args"
      />
    </template>
  </FormRender>
</template>

<script>
import _ from 'lodash';
import isVue2 from '../../../common/util-is-vue2'
import { defineAsyncComponent } from 'vue'

import formItemMixin from '../../common/form-item/mixin'
import subformMixin from '../../../common/components/subform-mixin'

export default {
  name: 'Subform',
  components: {
    FormRender: isVue2 ? () => import('../../form-render') : defineAsyncComponent(() => import('../../form-render')),
  },
  mixins: [formItemMixin, subformMixin],
}
</script>
