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
import formItemMixin from '../../common/form-item/mixin'

import isVue2, { defineAsyncComponent } from 'vue'

export default {
  name: 'Subform',
  components: {
    FormRender: isVue2 ? () => import('../../form-render') : defineAsyncComponent(() => import('../../form-render')),
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
  computed: {
    slotNames() {
      const $root = this.supNodes[0];
      let slotNames = Object.keys($root.$slots || {});
      slotNames = slotNames.concat(Object.keys($root.$scopedSlots || {}));
      return _.uniq(slotNames);
    },
  },
  methods: {
    async validate() {
      return new Promise(async resolve => {
        if(this.$refs['formRender']) { // incase not activated
          const valid = await this.$refs['formRender'].validate();
          resolve(valid);
        } else {
          resolve(true);
        }
      })
    }
  }
}
</script>
