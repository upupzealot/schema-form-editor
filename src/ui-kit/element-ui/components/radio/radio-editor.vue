<template>
  <Radio
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import editorItemMixin from '@/framework/common/editor-item/mixin'

import Radio from './radio'

export default {
  type: 'radio',
  components: {
    Radio,
  },
  mixins: [editorItemMixin],
}
</script>
