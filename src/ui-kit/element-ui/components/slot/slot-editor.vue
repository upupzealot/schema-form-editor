<template>
  <SSlot
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'

import SSlot from './slot'

export default {
  type: 'slot',
  components: {
    SSlot,
  },
  mixins: [editorItemMixin],
}
</script>
