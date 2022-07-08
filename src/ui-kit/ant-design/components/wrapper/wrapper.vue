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
    :style="{
      marginBottom: colMarginY,
      flexDirection: isLabelTop ? 'column' : '',
    }"
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
import isVue2 from '../../../common/util-is-vue2'
import { defineAsyncComponent } from 'vue'

import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'
import wrapperMixin from '../../../common/components/wrapper-mixin'

export default {
  name: 'Wrapper',
  components: {
    FormRender: isVue2 ? () => import('../../form-render') : defineAsyncComponent(() => import('../../form-render')),
  },
  mixins: [formItemMixin, wrapperMixin],
}
</script>
