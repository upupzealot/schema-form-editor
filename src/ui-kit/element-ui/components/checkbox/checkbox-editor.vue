<template>
  <Checkbox
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
  />
</template>

<script>
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'

import Checkbox from './checkbox'

export default {
  type: 'checkbox',
  components: {
    Checkbox,
  },
  mixins: [editorItemMixin],
}
</script>
